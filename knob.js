// Create rotateKnob event listener
/*function mousedown(event) {
  let mouseX, mouseY;
  document.querySelector('.rotateKnob').addEventListener('mousemove', move);

}
function mouseup(event) {
    document.querySelector('.rotateKnob').removeEventListener('mousemove', move);

}
function whilemousedown(event) {
    let originY = window.scrollY + document.querySelector('.rotateKnob').getBoundingClientRect().top;
    let originX = window.scrollX + document.querySelector('.rotateKnob').getBoundingClientRect().left;





    //let originX = parseFloat(window.getComputedStyle(document.querySelector('.rotateKnob')).getPropertyValue("width")) * 0.5;
    //let originY = parseFloat(window.getComputedStyle(document.querySelector('.rotateKnob')).getPropertyValue("height")) * 0.5;

 
    
    //document.querySelector('.rotateThumb').style.left = originX - (parseFloat(window.getComputedStyle(document.querySelector('.rotateThumb')).getPropertyValue("width")) * 0.5) + 'px';
    //document.querySelector('.rotateThumb').style.top = originY - (parseFloat(window.getComputedStyle(document.querySelector('.rotateThumb')).getPropertyValue("height")) * 0.5) + 'px';  



}

function move(event){
    let mouseX = event.clientX;
    let mouseY = event.clientY;

    let originY = window.scrollY + document.querySelector('.rotateKnob').getBoundingClientRect().top + parseFloat(window.getComputedStyle(document.querySelector('.rotateKnob')).getPropertyValue("height")) * 0.5;;
    let originX = window.scrollX + document.querySelector('.rotateKnob').getBoundingClientRect().left + parseFloat(window.getComputedStyle(document.querySelector('.rotateKnob')).getPropertyValue("width")) * 0.5;

    let radius = Math.sqrt( Math.pow( (mouseX - originX), 2 ) + Math.pow( (mouseY - originY), 2 ) );

    let radiusY = originY - radius;

    let oppositeLength = Math.sqrt( Math.pow( (mouseX - originX), 2 ) + Math.pow( (mouseY - radiusY), 2 ) );



    let theta = Math.acos ( ( Math.pow(radius, 2) + Math.pow(radius, 2) - Math.pow(oppositeLength, 2) ) / (2 * radius * radius) );
    
    let pi = Math.PI;
    theta = theta * (180/pi);

    if (mouseX < originX) {
        theta = theta * -1; 
    }
    
    console.log(theta);
    
}

document.querySelector('.rotateKnob').addEventListener('mousedown', mousedown);
document.querySelector('.rotateKnob').addEventListener('mouseup', mouseup);
document.querySelector('.rotateKnob').addEventListener('mouseout', mouseup);
*/