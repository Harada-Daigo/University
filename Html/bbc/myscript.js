var THREAD_NUMBER = 0;
var MAX_THREAD_NUMBER = 10000;
function addElement(parent,tag,tag_class,textContent,href,list_tag,list_class){
    let el;
    tag_atb = tag_class.split("&");
    
    if(typeof(parent) == typeof(document.body)){
        el = parent;
    }
    else if(parent.substr(0,1)=="#"){
        el = document.getElementById(parent.substr(1));
    }
    else{
        el = document.querySelector("."+parent)
    }
    let nel = document.createElement(tag);
    if(textContent != null){
        nel.textContent = textContent; 
    }
    if(href != null){
        nel.href = href;
    }

    for(i=0;i<tag_atb.length;i++){
        if(tag_atb[i].substr(0,1)=="#"){
            nel.id = tag_atb[i].substr(1);
        }
        else{
            nel.className = tag_atb[i];
        }
    }

    if(list_tag == true){
        let list = document.createElement("li");
        list.id = list_class;
        el.appendChild(list);
        el = list;
    }
    el.appendChild(nel);

    return nel
}
function Menu(titles){
    for(let i=0;i<titles.length;i++){
        addElement(
                   parent = "#menu_list",
                   tag = "a",
                   tag_class = "menu_anchor",
                   textContent = titles[i],
                   href = "#THREAD"+i,
                   list_tag = true,
                   list_class = "menu_contents"
                  );
    }
}
function SideBar(genre,textContents,hrefs){
    addElement(
        parent = "#side_list",
        tag = "p",
        tag_class = "side_title",
        textContent = genre,
        href = null,
        list_tag = null,
        list_class = "list_element"
    );
    for(let i=0;i<hrefs.length;i++){
        addElement(
            parent = "#side_list",
            tag = "a",
            tag_class = "side_url",
            textContent = textContents[i],
            href = hrefs[i],
            list_tag = true,
            list_class = "list_element"
        );
    }
}
function addContent(n,title_name,names,ids,contents){
    let thread,title_div,title,name,value;
        thread = addElement(
                            parent = "#wrap",
                            tag = "div",
                            tag_class = "#THREAD"+n+"&threads", 
                            textContent = null,
                            href = null,
                            list_tag = null,
                            list_class = null
                            );
        title_div = addElement(
                            parent = thread,
                            tag = "div",
                            tag_class = "titlediv",
                            textContent = null,
                            href = null,
                            list_tag = null,
                            list_class = null
                            );
        title = addElement(
                            parent = title_div,
                            tag = "p",
                            tag_class = "titles",
                            textContent = title_name,
                            href = null,
                            list_tag = null,
                            list_class = null
                            );
    for(let i=0;i<names.length;i++){
        name = addElement(
                            parent=thread,
                            tag = "p",
                            tag_class = "names",
                            textContent = n+":"+i+": "+names[i]+" "+ids[i],
                            href = null,
                            list_tag=null,
                            list_class=null
                            );
        value = addElement(
                            parent = thread,
                            tag = "p",
                            tag_class = "values",
                            textContent = contents[i],
                            href = null,
                            list_tag=null,
                            list_class=null
                            );
    }
}
window.onload = function(){
    addElement(
               parent = "#side_list",
               tag = "a",
               tag_class = "side_url",
               textContent = "アニメ",
               href = ".\\anime.html",
               list_tag = true,
               list_class = "list_element"
    );
    addElement(
                parent = "#side_list",
                tag = "a",
                tag_class = "side_url",
                textContent = "あんこ",
                href = ".\\anko.html",
                list_tag = true,
                list_class = "list_element"
    );
    addElement(
        parent = "#side_list",
        tag = "p",
        tag_class = "side_title",
        textContent = "アニメ系",
        href = null,
        list_tag = null,
        list_class = "list_element"
        );
    addElement(
            parent = "#side_list",
            tag = "a",
            tag_class = "side_url",
            textContent = "政治",
            href = ".\\seiji.html",
            list_tag = true,
            list_class = "list_element"
    );


    let titles = ["sfsadf","ffsafsa","fsdfsdaf","fhghfd","gsdggdsfg"];
    let names = ["andko","dgfasdf","ddfsdaf","dgfasdf","ddfsdaf","dgfasdf","ddfsdaf"];
    let ids = ["242342","fjasfas","rqwfw23r","fjasfas","rqwfw23r","fjasfas","rqwfw23r"];
    let contents = ["ankkkk","fkljsadfl;ksa","jfasl;dkfjas","fkljsadfl;ksa","jfasl;dkfjas","fkljsadfl;ksa","jfasl;dkfjas"];
    Menu(titles);
    for(let i=0;i<5;i++){
        addContent(i,titles[i],names,ids,contents);
    }
}