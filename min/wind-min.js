function cloudPush(){var i=-(windowWidth/4),t=-50,d=windowWidth/500,n=1+d;cloudpicker=floor(random(2)),console.log(cloudpicker),clouds.length<n&&clouds.push(new Cloud(random(i,t),random(.45*windowHeight,.625*windowHeight),round(random(10,100)),cloudpicker))}function Cloud(i,t,d,n){this.x=i,this.y=t,this.lifespan=d,this.radius=100,this.width=150,this.height=120,this.windSpeedMotion=windSpeed/2,this.windowRatioSpeed=windowWidth/100,this.windmovementX=this.windSpeedMotion/this.windowRatioSpeed,this.fadeInOpacity=0,this.fadeInX=0,this.fadeOutX=windowWidth,this.display=function(){push(),imageMode(CENTER),image(cloudicons[n],this.x,this.y,this.width,this.height),console.log(this.windmovementX),pop()},this.update=function(){this.x=this.x+this.windSpeedMotion,this.x<this.fadeInX&&(this.lifespan+=.5),this.x>this.fadeOutX&&this.lifespan--},this.updateWind=function(){this.windmovementX=this.windSpeedMotion/this.windowRatioSpeed},this.lifespancheck=function(){return this.lifespan<=0?!0:!1}}