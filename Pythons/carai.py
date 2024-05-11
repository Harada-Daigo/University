import tkinter as tk
import math

class main:
    def __init__(self,Walls,Car):
        self.CarID = None
        self.EyesID1 = None
        self.EyesID2 = None
        self.walls = Walls
        self.car = Car

        self.tk = tk.Tk()
        self.tk.minsize(600,600)
        self.tk.title("car")

        self.cv = tk.Canvas(self.tk, width=600, height=600)
        self.cv.pack()

        self.drawWalls()
        self.drawCars()

    def main(self):

        print(car.x,car.y)
        dx,dy = car.Explotion(wall)
        main.drawMovingCar(dx,dy)

        self.tk.after(1000,self.main)
    
    def drawWalls(self):
        for wall in self.walls.Walls:
            self.cv.create_line(wall.x1,wall.y1,wall.x2,wall.y2,fill="blue",width=1)
        
    def drawCars(self):
        self.CarID = self.cv.create_oval(self.car.x-self.car.r,self.car.y-self.car.r,self.car.x+self.car.r,self.car.y+self.car.r,fill="red",tag="car")
        self.EyesID1 = self.cv.create_line(self.car.x-self.car.L,self.car.y-self.car.L,self.car.x+self.car.L,self.car.y+self.car.L,fill="black",width=1)
        self.EyesID2 = self.cv.create_line(self.car.x-self.car.L,self.car.y+self.car.L,self.car.x+self.car.L,self.car.y-self.car.L,fill="black",width=1)
    
    def drawMovingCar(self,dx,dy):
        self.cv.move(self.CarID,dx,dy)
        self.cv.move(self.EyesID1,dx,dy)
        self.cv.move(self.EyesID2,dx,dy)
        self.tk.update()


class CAR:
    def __init__(self,x,y,r,angle,speed):
        self.x = x
        self.y = y

        self.r = r

        self.angle = angle

        self.speed = speed

        self.L = 100

    def move(self):

        self.x += self.speed * math.cos(self.angle)
        self.y += self.speed * math.sin(self.angle)

        print("moving! x={0},y={1}".format(self.x,self.y))

        return self.speed * math.cos(self.angle),self.speed * math.sin(self.angle)
    
    def spin(self,n):
        self.angle += (self.angle + n) % (2*math.pi)
    
    def in_rect(self,x1,y1,x2,y2):
        if(x1<=x2):
            if(y1<=y2):
                if((x1-self.r<=self.x)and(self.x<=x2+self.r)and(y1-self.r<=self.y)and(self.y<=y2+self.r)):
                    return True
            else:
                if((x1-self.r<=self.x)and(self.x<=x2+self.r)and(y2-self.r<=self.y)and(self.y<=y1+self.r)):
                    return True
        else:
            if(y1<=y2):
                if((x2-self.r<=self.x)and(self.x<=x1+self.r)and(y1-self.r<=self.y)and(self.y<=y2+self.r)):
                    return True
            else:
                if((x2-self.r<=self.x)and(self.x<=x1+self.r)and(y2-self.r<=self.y)and(self.y<=y1+self.r)):
                    return True
                
        return False

    def body(self,walls):
        Bodys = []
        for wall in walls.Walls:
            AP_x = self.x - wall.x1
            AP_y = self.y - wall.y1

            BP_x = self.x - wall.x2
            BP_y = self.y - wall.y2

            AB_x = wall.x2 - wall.x1
            AB_y = wall.y2 - wall.y1

            AP = VECTOR(AP_x,AP_y)
            BP = VECTOR(BP_x,BP_y)
            AB = VECTOR(AB_x,AB_y)

            cp = AP.cross_product(AB)

            f = cp / AB.abs()
  
            if(math.fabs(f) < self.r):
                if(self.in_rect(wall.x1,wall.y1,wall.x2,wall.y2)):
                    print("0,f={0},cp={1},abs={2}".format(f,cp,AB.abs()))
                    Bodys.append(True)
                else:
                    print("1,f={0},cp={1},abs={2}".format(f,cp,AB.abs()))
                    Bodys.append(False)
            else:
                    print("2,f={0},cp={1},abs={2}".format(f,cp,AB.abs()))
                    Bodys.append(False)
        return Bodys
    
    def eyes(self,walls):
        Eyes = []

        Ax = self.x - self.L
        Ay = self.y - self.L
        Bx = self.x + self.L
        By = self.y + self.L
        Cx = self.x - self.L
        Cy = self.y + self.L
        Dx = self.x + self.L
        Dy = self.y - self.L

        for wall in walls.Walls:
            Px = wall.x1
            Py = wall.y1
            Qx = wall.x2
            Qy = wall.y2

            PQ = VECTOR(Qx-Px,Qy-Py)
            PA = VECTOR(Ax-Px,Ay-Py)
            PB = VECTOR(Bx-Px,By-Py)
            PC = VECTOR(Cx-Px,Cy-Py)
            PD = VECTOR(Dx-Px,Dy-Py)

            s1 = PQ.cross_product(PA)
            t1 = PQ.cross_product(PB)
            s2 = PQ.cross_product(PD)
            t2 = PQ.cross_product(PD)

            st1 = s1 * t1
            st2 = s2 * t1

            if((st1 < 0) or (st2 < 0)):
                Eyes.append(True)
            else:
                Eyes.append(False)
            
        return Eyes
    
    def RollBack(self):
        self.spin(math.pi)
        self.move()
        self.spin(math.pi)
    
    def Explotion(self,walls):
        while(True):
            dx,dy = self.move()
            bodys = self.body(walls)
            print(bodys)
            if(True in bodys):
                self.RollBack()
                self.spin(math.pi/10)
                print("RollBack!")
            else:
                return dx,dy
            
class LINE:
    def __init__(self,x1,y1,x2,y2):
        self.x1 = x1
        self.y1 = y1

        self.x2 = x2
        self.y2 = y2

class WALL:
    def __init__(self,r):
        self.Walls = []
        self.r = r * 5
    def AutoGenerate(self,x1,y1,x2,y2):
        N = 0.00000000001
        if(x2-x1==0):
            radian = math.atan2((y2-y1),N)
        else:
            radian = math.atan2((y2-y1),(x2-x1))

        radian = (radian+math.pi/2)%(math.pi*2)

        wx = self.r*math.cos(radian)
        wy = self.r*math.sin(radian)

        print("radian={0},wx={1},wy={2}".format(radian/math.pi,wx,wy))

        self.Walls.append(LINE(x1,y1,x2,y2))
        self.Walls.append(LINE(x1+wx,y1+wy,x2+wx,y2+wy))

    def ManualGenerate(self,x1,y1,x2,y2):
        self.Walls.append(LINE(x1,y1,x2,y2))
    
class VECTOR:
    def __init__(self,xv,yv):
        self.xv = xv
        self.yv = yv
    
    def cross_product(self,v):
        return self.xv*v.yv - self.yv*v.xv

    def abs(self):
        return math.sqrt(self.xv*self.xv + self.yv*self.yv)
    
car = CAR(91-20,100,10,5,5)
wall = WALL(car.r)
wall.AutoGenerate(91,0,91,100)
wall.ManualGenerate(91-50,0,91-50,130)
wall.ManualGenerate(91-60,90,91,100+50)
wall.AutoGenerate(91,100,200,100)
a = car.body(wall)
print(a)
main = main(wall,car)
import time
print(car.x,car.y)

main.main()



main.tk.mainloop()



    


