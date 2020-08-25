// Add to editor - opacity, rotation, size

const growSpeed = 0.15;
const shrinkSpeed = 0.2;


function createCat(){
    let body = document.querySelector('body');

    // Create cat container
    let newCat = document.createElement('div');

    // Create cat parts
    let catHead = document.createElement('div');
    let catEarLeft = document.createElement('div');
    let catEarRight = document.createElement('div');
    let catInnerEarLeft = document.createElement('div');
    let catInnerEarRight = document.createElement('div');
    let catEyeLeft = document.createElement('div');
    let catEyeRight = document.createElement('div');
    let catPupilLeft = document.createElement('div');
    let catPupilRight = document.createElement('div');
    let catMouthLeft = document.createElement('div');
    let catMouthRight = document.createElement('div');
    let catUpperWiskerLeft =  document.createElement('div');
    let catUpperWiskerRight =  document.createElement('div');
    let catLowerWiskerLeft = document.createElement('div');
    let catLowerWiskerRight = document.createElement('div');


    // Set classes
    newCat.className = 'cat';
    catHead.className = 'catHead circle';
    catEarLeft.className = 'catEarLeft circle';
    catEarRight.className = 'catEarRight circle';
    catInnerEarLeft.className = 'catInnerEarLeft circle';
    catInnerEarRight.className = 'catInnerEarRight circle';
    catEyeLeft.className = 'catEyeLeft circle';
    catEyeRight.className = 'catEyeRight circle';
    catPupilLeft.className = 'catPupilLeft circle';
    catPupilRight.className = 'catPupilRight circle';
    catMouthLeft.className = 'catMouthLeft';
    catMouthRight.className = 'catMouthRight';
    catUpperWiskerLeft.className = 'catUpperWiskerLeft';
    catUpperWiskerRight.className = 'catUpperWiskerRight';
    catLowerWiskerLeft.className = 'catLowerWiskerLeft';
    catLowerWiskerRight.className = 'catLowerWiskerRight';


    // Append cat parts to cat container 
    newCat.appendChild(catHead);
    newCat.appendChild(catEarLeft);
    newCat.appendChild(catEarRight);
    newCat.appendChild(catInnerEarLeft);
    newCat.appendChild(catInnerEarRight);
    newCat.appendChild(catEyeLeft);
    newCat.appendChild(catEyeRight);
    newCat.appendChild(catPupilLeft);
    newCat.appendChild(catPupilRight);
    newCat.appendChild(catMouthLeft);
    newCat.appendChild(catMouthRight);
    newCat.appendChild(catUpperWiskerLeft);
    newCat.appendChild(catUpperWiskerRight);
    newCat.appendChild(catLowerWiskerLeft);
    newCat.appendChild(catLowerWiskerRight);


    // Set color theme
    let colorTheme = generateColorTheme();
    let colorBase = colorTheme[0];
    let colorDark = colorTheme[1];
    let colorLight = colorTheme[2];

    // Set styling
    children = newCat.children;
    
    for (let i = 0; i < children.length; i++){
        children[i].style.position = 'absolute';
        if (children[i].classList[1] == 'circle'){
            children[i].style.borderRadius = '50%';
        }
    }

    catHead.style.backgroundColor = colorBase;
    catEarLeft.style.backgroundColor = colorBase;
    catEarRight.style.backgroundColor = colorBase;
    catMouthLeft.style.backgroundColor = colorBase;
    catMouthRight.style.backgroundColor = colorBase;

    catInnerEarLeft.style.backgroundColor = colorDark;
    catInnerEarRight.style.backgroundColor = colorDark;
    catMouthLeft.style.borderColor = colorDark;
    catMouthRight.style.borderColor = colorDark;

    catPupilLeft.style.backgroundColor = colorLight;
    catPupilRight.style.backgroundColor = colorLight;

    catEyeLeft.style.backgroundColor = 'white';
    catEyeRight.style.backgroundColor = 'white';
    catUpperWiskerLeft.style.backgroundColor = 'white';
    catUpperWiskerRight.style.backgroundColor = 'white';
    catLowerWiskerLeft.style.backgroundColor = 'white';
    catLowerWiskerRight.style.backgroundColor = 'white';

    catUpperWiskerLeft.style.transform = 'rotate(0.262rad)';
    catUpperWiskerRight.style.transform = 'rotate(-0.262rad)';
    catLowerWiskerLeft.style.transform = 'rotate(-0.262rad)';
    catLowerWiskerRight.style.transform = 'rotate(0.262rad)';

    catMouthLeft.style.borderStyle = 'solid';
    catMouthLeft.style.borderBottom = '0';

    catMouthRight.style.borderStyle = 'solid';
    catMouthRight.style.borderBottom = '0';

    // Set right click event listener
    for (let i = 0; i < children.length; i++){
        children[i].addEventListener('contextmenu', function(event) {
            event.preventDefault();       
            removeCat(this.parentElement);
        });
        children[i].addEventListener('click', function(event) {
            editCat(this.parentElement);
        });
    }

    // Add cat to the DOM
    body.appendChild(newCat);

    // Save mouse position
    let x = event.clientX;
    let y = event.clientY; 

    // Generate a random cat size
    let diameter = Math.floor(Math.random() * (350)) + 50;
    

    // Grow animation 
    catHead.style.width = diameter + 'px';
    catHead.style.left = x + 'px';
    catHead.style.top = y +  'px';
    catAnimate(newCat, 'grow');
}

function removeCat(cat){
    let timeout = 16 * (1/shrinkSpeed);
    setTimeout(function(){
        cat.remove();
    }, timeout);
    catAnimate(cat, 'shrink');
    //element.parentElement.remove();
}

// Returns three shades (dark, normal, light) of the same color
function generateColorTheme(color){
    let r,g,b, colorBase, colorDark, colorLight;
    if (typeof color === 'undefined'){
        r = Math.floor(Math.random() * 255);
        g = Math.floor(Math.random() * 255);
        b = Math.floor(Math.random() * 255);
        colorBase = 'rgb(' + r + ',' + g + ',' + b + ')';
    } else {
        r = color[0];
        g = color[1];
        b = color[2];
        colorBase = 'rgb(' + r + ',' + g + ',' + b + ')';

    }
    let darkMul = 0.6;
    r = r * darkMul; g = g * darkMul; b = b * darkMul;
    colorDark = 'rgb(' + r + ',' + g + ',' + b + ')';
    r = r * 1.67;
    g = g * 1.67;
    b = b * 1.67;
    let lightMul = 255 / Math.max(r, g, b);
    if (lightMul < 1.3){
        lightMul = 1.3;
    }
    r = Math.min(r * lightMul, 255);  
    g = Math.min(g * lightMul, 255); 
    b = Math.min(b * lightMul, 255);
    colorLight = 'rgb(' + r + ',' + g + ',' + b + ')';
    return [colorBase, colorDark, colorLight];
}

// Handles the grow and shrink animations
// direction: 'grow' for grow animation, 'shrink' for shrink animation
function catAnimate(cat, direction){
    let catHead = cat.querySelector('.catHead');
    let catEarLeft = cat.querySelector('.catEarLeft');
    let catEarRight = cat.querySelector('.catEarRight');
    let catInnerEarLeft = cat.querySelector('.catInnerEarLeft');
    let catInnerEarRight = cat.querySelector('.catInnerEarRight');
    let catEyeLeft = cat.querySelector('.catEyeLeft');
    let catEyeRight = cat.querySelector('.catEyeRight');
    let catPupilLeft = cat.querySelector('.catPupilLeft');
    let catPupilRight = cat.querySelector('.catPupilRight');
    let catUpperWiskerLeft =  cat.querySelector('.catUpperWiskerLeft');
    let catUpperWiskerRight =  cat.querySelector('.catUpperWiskerRight');
    let catLowerWiskerLeft = cat.querySelector('.catLowerWiskerLeft');
    let catLowerWiskerRight = cat.querySelector('.catLowerWiskerRight');
    let catMouthLeft = cat.querySelector('.catMouthLeft');
    let catMouthRight = cat.querySelector('.catMouthRight');

    let diameter = parseInt(catHead.style.width, 10);
    let currentDiameter = direction == 'grow' ? 0 : diameter;
    let x = parseInt(catHead.style.left, 10) + (direction == 'grow' ? 0 : diameter/2); 
    let y = parseInt(catHead.style.top, 10) + (direction == 'grow' ? 0 : diameter/2); 


    let id = setInterval(frame, 16);

    function frame(){
        if (currentDiameter > diameter || currentDiameter < 0) {
            clearInterval(id);
        } else {
            currentDiameter += direction == 'grow' ? (diameter * growSpeed) : -(diameter * shrinkSpeed);
            // Cat Head
            catHead.style.width = currentDiameter + 'px';
            catHead.style.height = currentDiameter + 'px';
            catHead.style.left = (x - (currentDiameter * 0.5)) + 'px';
            catHead.style.top = (y - (currentDiameter * 0.5)) + 'px';

            // Cat Ear Left
            catEarLeft.style.width = (currentDiameter * 0.25) + 'px';
            catEarLeft.style.height = (currentDiameter * 0.45) + 'px';
            catEarLeft.style.left = (x - (currentDiameter * 0.40)) + 'px';
            catEarLeft.style.top = (y - (currentDiameter * 0.65)) + 'px';

            // Cat Ear Right
            catEarRight.style.width = (currentDiameter * 0.25) + 'px';
            catEarRight.style.height = (currentDiameter * 0.45) + 'px';
            catEarRight.style.left = (x + (currentDiameter * 0.15)) + 'px';
            catEarRight.style.top = (y - (currentDiameter * 0.65)) + 'px';

            // Cat Inner Ear Left
            catInnerEarLeft.style.width = (currentDiameter * 0.15) + 'px';
            catInnerEarLeft.style.height = (currentDiameter * 0.32) + 'px';
            catInnerEarLeft.style.left = (x - (currentDiameter * 0.36)) + 'px';
            catInnerEarLeft.style.top = (y - (currentDiameter * 0.62)) + 'px';

            // Cat Inner Ear Right
            catInnerEarRight.style.width = (currentDiameter * 0.15) + 'px';
            catInnerEarRight.style.height = (currentDiameter * 0.32) + 'px';
            catInnerEarRight.style.left = (x + (currentDiameter * 0.20)) + 'px';
            catInnerEarRight.style.top = (y - (currentDiameter * 0.62)) + 'px';

            // Cat Left Eye
            catEyeLeft.style.width = (currentDiameter * 0.30) + 'px';
            catEyeLeft.style.height = (currentDiameter * 0.15) + 'px';
            catEyeLeft.style.left = (x - (currentDiameter * 0.36)) + 'px';
            catEyeLeft.style.top = (y - (currentDiameter * 0.15)) + 'px';

            // Cat Right Eye
            catEyeRight.style.width = (currentDiameter * 0.30) + 'px';
            catEyeRight.style.height = (currentDiameter * 0.15) + 'px';
            catEyeRight.style.left = (x + (currentDiameter * 0.06)) + 'px';
            catEyeRight.style.top = (y - (currentDiameter * 0.15)) + 'px';

            // Cat Left Puple
            catPupilLeft.style.width = (currentDiameter * 0.05) + 'px';
            catPupilLeft.style.height = (currentDiameter * 0.15) + 'px';
            catPupilLeft.style.left = (x - (currentDiameter * 0.24)) + 'px';
            catPupilLeft.style.top = (y - (currentDiameter * 0.15)) + 'px';

            // Cat Right Puple
            catPupilRight.style.width = (currentDiameter * 0.05) + 'px';
            catPupilRight.style.height = (currentDiameter * 0.15) + 'px';
            catPupilRight.style.left = (x + (currentDiameter * 0.18)) + 'px';
            catPupilRight.style.top = (y - (currentDiameter * 0.15)) + 'px';

            // Cat Left Mouth Circle
            catMouthLeft.style.width = (currentDiameter * 0.20) + 'px';
            catMouthLeft.style.height = (currentDiameter * 0.10) + 'px';
            catMouthLeft.style.left = (x - (currentDiameter * 0.245)) + 'px';
            catMouthLeft.style.top = (y + (currentDiameter * 0.17)) + 'px';
            catMouthLeft.style.borderWidth = (currentDiameter * 0.025) + 'px';
            catMouthLeft.style.borderTopLeftRadius = '100px'//parseInt(catMouthLeft.style.height, 10) + parseInt(catMouthLeft.style.borderWidth, 10) + 'px';
            catMouthLeft.style.borderTopRightRadius = '100px'//parseInt(catMouthLeft.style.height, 10) + parseInt(catMouthLeft.style.borderWidth, 10) + 'px';

            // Cat Right Mouth Circle
            catMouthRight.style.width = (currentDiameter * 0.20) + 'px';
            catMouthRight.style.height = (currentDiameter * 0.10) + 'px';
            catMouthRight.style.left = (x - (currentDiameter * 0.005)) + 'px'
            catMouthRight.style.top = (y + (currentDiameter * 0.17)) + 'px';
            catMouthRight.style.borderWidth = (currentDiameter * 0.025) + 'px';
            catMouthRight.style.borderTopLeftRadius = '100px'//parseInt(catMouthLeft.style.height, 10) + parseInt(catMouthLeft.style.borderWidth, 10) + 'px';
            catMouthRight.style.borderTopRightRadius = '100px'//parseInt(catMouthLeft.style.height, 10) + parseInt(catMouthLeft.style.borderWidth, 10) + 'px';
        

            // Cat Left Upper Wisker
            catUpperWiskerLeft.style.width = (currentDiameter * 0.45) + 'px';
            catUpperWiskerLeft.style.height = (currentDiameter * 0.02) + 'px';
            catUpperWiskerLeft.style.left = (x - (currentDiameter * 0.55)) + 'px';
            catUpperWiskerLeft.style.top = (y + (currentDiameter * 0.00)) + 'px';           

            // Cat Right Upper Wisker
            catUpperWiskerRight.style.width = (currentDiameter * 0.45) + 'px';
            catUpperWiskerRight.style.height = (currentDiameter * 0.02) + 'px';
            catUpperWiskerRight.style.left = (x + (currentDiameter * 0.09)) + 'px';
            catUpperWiskerRight.style.top = (y + (currentDiameter * 0.00)) + 'px';   

            // Cat Left Lower Wisker
            catLowerWiskerLeft.style.width = (currentDiameter * 0.45) + 'px';
            catLowerWiskerLeft.style.height = (currentDiameter * 0.02) + 'px';
            catLowerWiskerLeft.style.left = (x - (currentDiameter * 0.55)) + 'px';
            catLowerWiskerLeft.style.top = (y + (currentDiameter * 0.15)) + 'px'; 

            // Cal Right Lower Wisker
            catLowerWiskerRight.style.width = (currentDiameter * 0.45) + 'px';
            catLowerWiskerRight.style.height = (currentDiameter * 0.02) + 'px';
            catLowerWiskerRight.style.left = (x + (currentDiameter * 0.09)) + 'px';
            catLowerWiskerRight.style.top = (y + (currentDiameter * 0.15)) + 'px'; 

        }
    }
}



// Create Left Click Event Listener
document.querySelector('html').addEventListener( 'click', function (event) {
    if(event.srcElement.parentElement == null) {
        createCat();
    }
});

// Create Right Click Event Listener
document.querySelector('html').addEventListener('contextmenu', (event) => {
    event.preventDefault();

    let element = document.querySelector('.colorPicker');
    let clone = element.cloneNode(true);
    element.parentNode.replaceChild(clone, element);

    element = document.querySelector('.rotatePicker');
    clone = element.cloneNode(true);
    element.parentNode.replaceChild(clone, element);

    element = document.querySelector('.sizeSlider');
    clone = element.cloneNode(true);
    element.parentNode.replaceChild(clone, element);

    document.querySelector('#redSlider').value = 128;
    document.querySelector('#greenSlider').value = 128;
    document.querySelector('#blueSlider').value = 128;

    document.querySelector('.rotateThumb').style.top = '1px';
    document.querySelector('.rotateThumb').style.left = '32.5px';

    document.querySelector('.sizeSlider').value = 0;

    makeSizeSliderThumbSizeResponsive();
});


// Make sizeSlider thumb size dynamic
function makeSizeSliderThumbSizeResponsive(){
    let slider = document.querySelector('.sizeSlider')
    slider.oninput =_=> slider.style.setProperty('--thumbSize', `${slider.value/20 + 12}px`)
    
    slider = document.querySelector('.opacitySlider');
    slider.onInput =_=> slider.style.setProperty('--borderWidth', `${slider.value}px`);

}
//makeSizeSliderThumbSizeResponsive();
document.querySelector('.sizeSlider').style.setProperty('--thumbSize', '12px')

document.querySelector('.sizeSlider').addEventListener('input', () => {
    event.srcElement.style.setProperty('--thumbSize', `${event.srcElement.value/20 + 12}px`);
});

document.querySelector('.opacitySlider').addEventListener('input', () => {
    event.srcElement.style.setProperty('--borderWidth', `${event.srcElement.value/22+1}px`);
    console.log(`${event.srcElement.value/20}`);
});
