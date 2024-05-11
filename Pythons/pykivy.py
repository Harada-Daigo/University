import tkinter as tk
import xml.etree.ElementTree as ET

#root = tk.Tk()
#root.mainloop()


class parts:
    def __init__(self,id,type):
        self.rootXML = None
        self.id = id
        self.type = type
        self.value = None
        self.td = 0
        self.time = 0
        self.Next = []
        self.Prev = []
    
class logical_circuits:
    def __init__(self):
        self.SimulationFlag = 1
        self.root = parts("root","root")
        self.Input = []
        self.Output = []
        self.tl=0

    def search(self,id,obj):
        for i in range(len(obj.Next)):
            if(obj.Next[i].id == id): return obj.Next[i]
            sr = self.search(id,obj.Next[i])
            if( sr != 0 ): return sr
        return 0
    
    def GenerateNode(self,xml_obj,parent):
        for i in range(len(xml_obj)):
            #print(xml_obj[i].attrib["id"]+":"+parent.id)
            obj = self.search(xml_obj[i].attrib["id"],self.root)
            if(self.search(xml_obj[i].attrib["id"],self.root)==0): obj = parts(xml_obj[i].attrib["id"],xml_obj[i].tag)

            parent.Next.append(obj)
            parent.Next[i].Prev.append(parent)

            #print("--"+parent.id+":"+parent.Next[i].id)
            print("--"+obj.id+":"+obj.Prev[0].id)
            
            if(obj.type == "input"): self.Input.append(obj) 
            elif(obj.type == "output"): self.Output.append(obj) 

            if(len(xml_obj[i])>0):self.GenerateNode(xml_obj[i],parent.Next[i])

            
    def readXML(self):
        self.filename = input("file name => ")
        self.tree = ET.parse(self.filename)
        self.rootXML = self.tree.getroot()
        circuit = self.rootXML[0]

        for rlt in (self.rootXML.find("result")):
            self.rootXML.find("result").remove(rlt)

        self.GenerateNode(circuit,self.root)

    def Record(self,obj,simulator_id):
        simulator_tag = self.rootXML.find("result").find("simulator"+str(simulator_id))

        time = ET.SubElement(simulator_tag,obj.id)

        time.set("timeline",str(obj.time))

        self.tree.write(self.filename, encoding='utf-8', xml_declaration=True)


    def calc_td(self,obj):
        if(len(obj.Next)>0):
            max = obj.Next[0].td + obj.Next[0].time
            for i in range(1,len(obj.Next)):
                if( max<obj.Next[i].td + obj.Next[i].time ): max = obj.Next[i].td + obj.Next[i].time
            obj.time = max
        
    def AND(self,obj):
        on = 0
        for i in range(len(obj.Next)):
            if( obj.Next[i].value == 0 ):
                obj.value = 0
                obj.time = obj.Next[i].td + obj.Next[i].time
            if( obj.Next[i].value == 1 ): on += 1   
        if( on == i+1 ): 
            obj.value = 1
            self.calc_td(obj)
        return obj.value
    def OR(self,obj):
        nf = 1
        for i in range(len(obj.Next)):
            if( obj.Next[i].value == None ): nf = 0
            if( obj.Next[i].value == 1 ):
                obj.value = 1
                obj.time = obj.Next[i].td + obj.Next[i].time
                nf = 0
        if(nf):
            obj.value = 0
            self.calc_td(obj)
        return obj.value 
    def INV(self,obj):
        obj.value = (obj.Next[0].value + 1) % 2
        obj.time = obj.Next[0].td + obj.Next[0].time
        return obj.value
    def XOR(self,obj):
        if(obj.Next[0].value==None or obj.Next[1].value==None): return None
        if( obj.Next[0].value + obj.Next[1].value == 1 ):
            obj.value = 1
            self.calc_td(obj)
        else: 
            obj.value = 0
            self.calc_td(obj)

    def part_of_simulation(self,obj,simulator_id):
        cn = 0
        if(obj.type == "and"):
            cn = self.AND(obj)
            print(obj.id+"*"+str(obj.value))
        elif(obj.type == "or"):
            cn = self.OR(obj)
            print(obj.id+"*"+str(obj.value))
        elif(obj.type == "xor"):
            cn = self.XOR(obj)
            print(obj.id+"*"+str(obj.value))
        elif(obj.type == "inv"):
            cn = self.INV(obj)
            print(obj.id+"*"+str(obj.value))
        elif(obj.type == "output"):
            obj.value = obj.Next[0].value
            obj.time = obj.Next[0].td + obj.Next[0].time
            f = 1
            for elm in self.rootXML.find("result").find("simulator"+str(simulator_id)).findall(obj.id):
                print("^^^^^^"+elm.attrib["timeline"])
                if(elm.attrib["timeline"] == str(obj.time)):
                    f=0
                    break
            if(f) :self.Record(obj,simulator_id)

        if(cn != None):
            for i in range(len(obj.Prev)):
                self.part_of_simulation(obj.Prev[i],simulator_id)

    def simulation(self,in_dic,tm,simulator_id):
        result_tag = self.rootXML.find("result")
        ET.SubElement(result_tag,"simulator"+str(simulator_id))
        self.tree.write(self.filename, encoding='utf-8', xml_declaration=True)
        print("++++"+str(tm))
        for i in range(len(self.Input)):
            self.Input[i].value = in_dic[self.Input[i].id]
            self.Input[i].time = tm
            self.part_of_simulation(self.Input[i],simulator_id)

        for i in range(len(self.Output)):
            print(self.Output[i].id + " : " + str(self.Output[i].value))
    
    def TimeLine(self):
        in_dic = {}
        sim = self.rootXML[1]
        simulator_id = 0
        time = 0
        for i in range(len(sim)):
            if(sim[i].tag == "in"):
                in_dic[sim[i].attrib["id"]]=int(sim[i].text)
            elif(sim[i].tag == "time"):
                print("--"+str(time))
                self.simulation(in_dic,time,simulator_id)
                time += int(sim[i].text)
                simulator_id+=1

        for rlt in (self.rootXML.find("result")):
            self.rootXML.find("result").remove(rlt)

        
test = logical_circuits()
test.readXML()
test.TimeLine()
        


    

    
