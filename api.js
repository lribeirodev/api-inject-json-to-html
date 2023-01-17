fetch("./resume.json")
  .then((value) => value.json())
  .then((json) => {
    let bodyHTML = document.body.getElementsByTagName("*");

    for (let nodeHTML of bodyHTML) {
      let propertyName = undefined;
      let childPropertyName = undefined;
      let arrayPropertyName = undefined;

      if (nodeHTML.hasAttribute("property"))
        propertyName = nodeHTML.getAttribute("property");
      if (nodeHTML.hasAttribute("child"))
        childPropertyName = nodeHTML.getAttribute("child");
      if (nodeHTML.hasAttribute("array-property"))
        arrayPropertyName = nodeHTML.getAttribute("array-property");

      if (!!propertyName && !!childPropertyName) {
        injectMethodPropertyNameAndChild(
          propertyName,
          childPropertyName,
          nodeHTML,
          json
        );
      } else if (!!propertyName && !!arrayPropertyName) {
        injectMethodPropertyAndArrayProperty(
          propertyName,
          arrayPropertyName,
          nodeHTML,
          json
        );
      } else if (!!propertyName) {
        injectMethodProperty(propertyName, nodeHTML, json);
      }
    }
  });

function injectMethodProperty(property, node, json) {
  let data = json[property];
  node.innerHTML = data;
}

function injectMethodPropertyNameAndChild(property, child, node, json) {
  let data = json[property][child];
  node.innerHTML = data;
}

function injectMethodPropertyAndArrayProperty(property, array, node, json) {
  let arrData = json[property][array];
  let container = [...node.children]
  .find(value => value.hasAttribute("container"));
  

  if(container){
    let itemsNodeToCreate = [...node.children].map(value => {
      return {
        type: value.nodeName,
        class: value.className,
        property: value.getAttribute("property"),
        container: value.hasAttribute("container"),
      };
    });
    
    cleanInnerHTML(node);

    for(let index = 0; index < arrData.length; index++){
      let data = arrData[index];
      let containerNode = container.cloneNode();
      for(let item of itemsNodeToCreate){
        if(item.property){
          let nodeItem = document.createElement(item.type);
          nodeItem.className = item.class;
          nodeItem.innerHTML = data[item.property];

          if(item.property === "level"){
            let max = 4;
            let level = data[item.property];
            cleanInnerHTML(nodeItem);
            
            function createLevel(index, level, max, node){
              
              if(index > max){
                return;
              }

              let itemLevel = document.createElement("div");
              itemLevel.style.width = "10px";
              itemLevel.style.height = "10px";
              itemLevel.className = "resume__skills__container__level__item";
              if(index < level){
                itemLevel.style.backgroundColor = "green";
              } else {
                itemLevel.style.backgroundColor = "#dddddd";
              }
              
              node.appendChild(itemLevel);
              return createLevel(index+=1, level, max, node);
            };

            createLevel(0, level, max, nodeItem);
          }
          
          containerNode.appendChild(nodeItem);
        }
      }
      node.appendChild(containerNode);
    }
  }
}

function cleanInnerHTML(node) {
  node.innerHTML = "";
}

function createContainer(type, className, length) {
  let container = [];
  for(let index = 0; index <= length; index++){
    let el = document.createElement(type);
    el.className = className;
    container.push(el);
  };
  return container;
}