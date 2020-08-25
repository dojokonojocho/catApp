

function editCat(cat){

    let editor = document.querySelector('.editor');

    let baseColor = cat.querySelector('.catHead').style.backgroundColor;
    let rgb = baseColor.substring(baseColor.indexOf('(') + 1, baseColor.lastIndexOf(')')).split(/,\s*/)
    let red = rgb[0];
    let green = rgb[1];
    let blue = rgb[2];

    let transform = cat.querySelector('.catEarLeft').style.transform;
    let rotation = 0;

    if (transform.length > 0){
        rotation = transform.replace(/[a-zA-Z()]/g, '')
        
    }

    let catOriginX = parseFloat(cat.querySelector('.catHead').style.left) + (parseInt(cat.querySelector('.catHead').style.width) * 0.5);
    let catOriginY = parseFloat(cat.querySelector('.catHead').style.top) + (parseInt(cat.querySelector('.catHead').style.height) * 0.5);

    let thumbX = Math.sin(rotation) * 32;
    let thumbY = -Math.cos(rotation) * 32;

    document.querySelector('.rotateThumb').style.left = (parseFloat(window.getComputedStyle(document.querySelector('.rotateKnob')).getPropertyValue("width")) * 0.5) + thumbX - (parseFloat(window.getComputedStyle(document.querySelector('.rotateThumb')).getPropertyValue('width')) * 0.5) + 'px';
    document.querySelector('.rotateThumb').style.top = (parseFloat(window.getComputedStyle(document.querySelector('.rotateKnob')).getPropertyValue("height")) * 0.5) + thumbY - (parseFloat(window.getComputedStyle(document.querySelector('.rotateThumb')).getPropertyValue('height')) * 0.5) + 'px';


    let size = cat.querySelector('.catHead').style.width;

    editor.querySelector('#redSlider').value = red;
    editor.querySelector('#greenSlider').value = green;
    editor.querySelector('#blueSlider').value = blue;
    editor.querySelector('.sizeSlider').value = parseInt(cat.querySelector('.catHead').style.width);
    editor.querySelector('.sizeSlider').style.setProperty('--thumbSize', `${parseInt(cat.querySelector('.catHead').style.width)/20 + 12}px`);

    let element = editor.querySelector('.colorPicker');
    let clone = element.cloneNode(true);
    element.parentNode.replaceChild(clone, element);

    element = editor.querySelector('.rotatePicker');
    clone = element.cloneNode(true);
    element.parentNode.replaceChild(clone, element);

    element = document.querySelector('.sizeSlider');
    clone = element.cloneNode(true);
    element.parentNode.replaceChild(clone, element);

    makeSizeSliderThumbSizeResponsive();


    editor.querySelector('#redSlider').addEventListener('input', (event) => {
        red = event.srcElement.value;
        updateColor();
    });
    editor.querySelector('#greenSlider').addEventListener('input', (event) => {    
        green = event.srcElement.value;
        updateColor();
    });
    editor.querySelector('#blueSlider').addEventListener('input', (event) => {
        blue = event.srcElement.value;
        updateColor();
    });

    editor.querySelector('.sizeSlider').addEventListener('input', sizeUpdate);

    // Create rotateKnob event listener
    function mousedown(event) {
        document.querySelector('.rotateKnob').addEventListener('mousemove', move);  
    }
    function mouseup(event) {
        document.querySelector('.rotateKnob').removeEventListener('mousemove', move);
  
    }
  
    function move(event){
        let mouseX = event.clientX;
        let mouseY = event.clientY;
    
        let originY = window.scrollY + document.querySelector('.rotateKnob').getBoundingClientRect().top + parseFloat(window.getComputedStyle(document.querySelector('.rotateKnob')).getPropertyValue("height")) * 0.5;;
        let originX = window.scrollX + document.querySelector('.rotateKnob').getBoundingClientRect().left + parseFloat(window.getComputedStyle(document.querySelector('.rotateKnob')).getPropertyValue("width")) * 0.5;
    
        let radius = Math.sqrt( Math.pow( (mouseX - originX), 2 ) + Math.pow( (mouseY - originY), 2 ) );
    
        let radiusY = originY - radius;
    
        let oppositeLength = Math.sqrt( Math.pow( (mouseX - originX), 2 ) + Math.pow( (mouseY - radiusY), 2 ) );
    
        let thumbRatio = 32/radius;

        let relativeMouseX = mouseX - originX;
        let relativeMouseY = mouseY - originY;

        let thumbX = relativeMouseX * thumbRatio;
        let thumbY = relativeMouseY * thumbRatio;

        document.querySelector('.rotateThumb').style.left = (parseFloat(window.getComputedStyle(document.querySelector('.rotateKnob')).getPropertyValue("width")) * 0.5) + thumbX - (parseFloat(window.getComputedStyle(document.querySelector('.rotateThumb')).getPropertyValue('width')) * 0.5) + 'px';
        document.querySelector('.rotateThumb').style.top = (parseFloat(window.getComputedStyle(document.querySelector('.rotateKnob')).getPropertyValue("height")) * 0.5) + thumbY - (parseFloat(window.getComputedStyle(document.querySelector('.rotateThumb')).getPropertyValue('height')) * 0.5) + 'px';
    
        let theta = Math.acos ( ( Math.pow(radius, 2) + Math.pow(radius, 2) - Math.pow(oppositeLength, 2) ) / (2 * radius * radius) );
        

    
        if (mouseX < originX) {
            theta = theta * -1; 
        }
        

        // Manipulating the cat itself
        children = cat.children;
    
        for (let i = 0; i < children.length-4; i++){
            children[i].style.transform = `rotate(${theta}rad)`;
        }

        cat.querySelector('.catUpperWiskerLeft').style.transform = `rotate(${theta+0.262}rad)`
        cat.querySelector('.catUpperWiskerRight').style.transform = `rotate(${theta-0.262}rad)`
        cat.querySelector('.catLowerWiskerLeft').style.transform = `rotate(${theta-0.262}rad)`
        cat.querySelector('.catLowerWiskerRight').style.transform = `rotate(${theta+0.262}rad)`

        let catDiameter = parseInt(cat.querySelector('.catHead').style.width);
        //let catOriginX = parseFloat(cat.querySelector('.catHead').style.left) + (parseInt(cat.querySelector('.catHead').style.width) * 0.5);
        //let catOriginY = parseFloat(cat.querySelector('.catHead').style.top) + (parseInt(cat.querySelector('.catHead').style.height) * 0.5);

        let centerCoX = (-0.25 * catDiameter) - ( parseFloat(cat.querySelector('.catLowerWiskerLeft').style.width) * 0.25);
        centerCoX = centerCoX / catDiameter;

        let centerCoY = (0.15 * catDiameter) - ( parseFloat(cat.querySelector('.catLowerWiskerLeft').style.height) * 0.25);
        centerCoY = centerCoY / catDiameter;




        let coeficientXList = [-0.275, 0.275, -0.285, 0.285, -0.201, 0.201, -0.215, 0.215, -0.14, 0.09, -0.325, 0.325, -0.325, 0.325];
        let coeficientYList = [-0.425, -0.425, -0.46, -0.46, -0.075, -0.075, -0.075, -0.075, 0.22, 0.22, 0, 0, 0.145, 0.145];

        children = cat.children;
    
        for (let i = 1; i < 15; i++){
            let coeficientX = (coeficientXList[i-1] * Math.cos(theta)) + (-(coeficientYList[i-1]) * Math.sin(theta));
            let coeficientY = (coeficientYList[i-1] * Math.cos(theta)) - (-(coeficientXList[i-1]) * Math.sin(theta));
    
            children[i].style.left = catOriginX + (catDiameter * coeficientX) - ( parseFloat(children[i].style.width) * 0.5 ) + 'px';
            
            children[i].style.top = catOriginY + (catDiameter * coeficientY) - ( parseFloat(children[i].style.height) * 0.5 ) + 'px';    
        }


        
    }
  
    document.querySelector('.rotateKnob').addEventListener('mousedown', mousedown);
    document.querySelector('.rotatePicker').addEventListener('mouseup', mouseup);
    document.querySelector('.rotateKnob').addEventListener('click', move);


    function updateColor(){
        let colorTheme = generateColorTheme([red, green, blue]);
        let colorBase = colorTheme[0];
        let colorDark = colorTheme[1];
        let colorLight = colorTheme[2];

        cat.querySelector('.catHead').style.backgroundColor = colorBase;
        cat.querySelector('.catEarLeft').style.backgroundColor = colorBase;
        cat.querySelector('.catEarRight').style.backgroundColor = colorBase;
        cat.querySelector('.catMouthLeft').style.backgroundColor = colorBase;
        cat.querySelector('.catMouthRight').style.backgroundColor = colorBase;

        cat.querySelector('.catInnerEarLeft').style.backgroundColor = colorDark;
        cat.querySelector('.catInnerEarRight').style.backgroundColor = colorDark;
        cat.querySelector('.catMouthLeft').style.borderColor = colorDark;
        cat.querySelector('.catMouthRight').style.borderColor = colorDark;

        cat.querySelector('.catPupilLeft').style.backgroundColor = colorLight;
        cat.querySelector('.catPupilRight').style.backgroundColor = colorLight;
    }

    function sizeUpdate(){
        let newDiameter = event.srcElement.value;
        let oldDiameter = parseInt(cat.querySelector('.catHead').style.width);
        let sizeCoeficient = newDiameter / oldDiameter;

        //let catOriginX = parseFloat(cat.querySelector('.catHead').style.left) + (parseInt(cat.querySelector('.catHead').style.width) * 0.5);
        //let catOriginY = parseFloat(cat.querySelector('.catHead').style.top) + (parseInt(cat.querySelector('.catHead').style.height) * 0.5);

        let coeficientXList = [0, -0.275, 0.275, -0.285, 0.285, -0.201, 0.201, -0.215, 0.215, -0.145, 0.085, -0.325, 0.325, -0.325, 0.325];
        let coeficientYList = [0, -0.425, -0.425, -0.46, -0.46, -0.075, -0.075, -0.075, -0.075, 0.22, 0.22, 0, 0, 0.145, 0.145];

        let coeficientWidthList = [1, 0.25, 0.25, 0.15, 0.15, 0.30, 0.30, 0.05, 0.05, 0.20, 0.20, 0.45, 0.45, 0.45, 0.45]
        let coeficientHeightList = [1, 0.45, 0.45, 0.32, 0.32, 0.15, 0.15, 0.15, 0.15, 0.10, 0.10, 0.02, 0.02, 0.02, 0.02]

        let transform = cat.querySelector('.catEarLeft').style.transform;
        let rotation = 0;
    
        if (transform.length > 0){
            rotation = transform.replace(/[a-zA-Z()]/g, '');
        }

        let offset = (newDiameter * 0.5) //* (sizeCoeficient - 1) //* Math.cos(rotation);

        /*cat.querySelector('.catHead').style.width = parseFloat(cat.querySelector('.catHead').style.width) * sizeCoeficient + 'px';
        cat.querySelector('.catHead').style.height = parseFloat(cat.querySelector('.catHead').style.height) * sizeCoeficient + 'px';

        cat.querySelector('.catHead').style.left = catOriginX - offset + 'px';
        cat.querySelector('.catHead').style.top = catOriginY - offset + 'px';

        cat.querySelector('.catEarLeft').style.width = (oldDiameter * 0.25) * sizeCoeficient + 'px';
        cat.querySelector('.catEarLeft').style.height = (oldDiameter * 0.45) * sizeCoeficient + 'px';

        let coeficientX = (coeficientXList[1] * Math.cos(rotation)) + (-(coeficientYList[1]) * Math.sin(rotation));
        let coeficientY = (coeficientYList[1] * Math.cos(rotation)) - (-(coeficientXList[1]) * Math.sin(rotation));

        cat.querySelector('.catEarLeft').style.left = catOriginX + (newDiameter * coeficientX) - (parseFloat(cat.querySelector('.catEarLeft').style.width) * 0.5) + 'px';
        cat.querySelector('.catEarLeft').style.top = catOriginY + (newDiameter * coeficientY) - (parseFloat(cat.querySelector('.catEarLeft').style.height) * 0.5) + 'px';*/

       // console.log(sizeCoeficient - 1);

        children = cat.children;

    
        for (let i = 0; i < 15; i++){  
            let coeficientX = (coeficientXList[i] * Math.cos(rotation)) + (-(coeficientYList[i]) * Math.sin(rotation));
            let coeficientY = (coeficientYList[i] * Math.cos(rotation)) - (-(coeficientXList[i]) * Math.sin(rotation));
            let coeficientWidth = coeficientWidthList[i];
            let coeficientHeight = coeficientHeightList[i];

            children[i].style.width = oldDiameter * sizeCoeficient * coeficientWidth + 'px';
            children[i].style.height = oldDiameter * sizeCoeficient * coeficientHeight + 'px';

            children[i].style.left = catOriginX + (newDiameter * coeficientX) - ( parseFloat(children[i].style.width) * 0.5 ) + 'px';
            children[i].style.top = catOriginY + (newDiameter * coeficientY) - ( parseFloat(children[i].style.height) * 0.5 ) + 'px';

            //console.log('catOriginY: ', catOriginY);
            //console.log('newDiameter: ', newDiameter);
           // console.log('coeficientX: ', coeficientX);
            //console.log('height: ',  parseFloat(children[i].style.height) * 0.5);
          //  console.log('result: ', (catOriginY + (newDiameter * coeficientY) - ( parseFloat(children[i].style.height) * 0.5 )));
        } 
        cat.querySelector('.catMouthLeft').style.borderWidth = newDiameter * 0.025 + 'px';
        cat.querySelector('.catMouthRight').style.borderWidth = newDiameter * 0.025 + 'px';

    }

}