var MasasSpinner = React.createClass({
  propTypes: {
    progress: React.PropTypes.number,
    size: React.PropTypes.number,
    triggerStart: React.PropTypes.number
  },
 
  componentWillMount() {
  },

getInitialState: function() {
    return {
      startPt: 0      // (INT) \in [0,1]; start position on normalized length
    };
  },

  componentDidMount: function() {
    this.init();
  },

  componentWillReceiveProps: function( newProps ) {
      if( newProps.triggerStart != this.props.triggerStart && newProps.triggerStart === 1 )
        this.restartLoader(); 
  },

  init() {
    // CODE FOR GENERATING SMOOTH CURVE THROUGH ARRAY OF POINTS [x1,y1,x2,y2,...,xn,yn]
    if(typeof CanvasRenderingContext2D!=="undefined"){CanvasRenderingContext2D.prototype.curve=function(A,I,m,l){var z,B=[],J,K,E,G,F,H,c,d,e,f,C,D,j,v,s,w,u,n,o,p,q,r=A.length,a=!1,g,h,b=0.25,k=5;I=(typeof I==="number")?I:0.5;if(typeof m==="number"){m=parseInt(m,10);if(m===0){m=-4}a=m<0?!0:!1;b=1/Math.abs(m);if(a===!0){k=(typeof l==="number")?parseInt(l,10):10}if(k<1){k=1}}else{a=!0}z=A.concat();z.unshift(A[1]);z.unshift(A[0]);z.push(A[r-2],A[r-1]);for(j=2;j<r;j+=2){n=z[j];o=z[j+1];p=z[j+2];q=z[j+3];E=(p-z[j-2])*I;G=(z[j+4]-n)*I;F=(q-z[j-1])*I;H=(z[j+5]-o)*I;if(a===!0){g=p-n;h=q-n;m=(Math.max(k,Math.abs(Math.sqrt(g*g+h*h))*b+0.5))|0}for(D=0;D<=m;D++){C=D/m;s=Math.pow(C,2);v=s*C;u=s*3;w=v*2;c=w-u+1;d=u-w;e=v-2*s+C;f=v-s;J=c*n+d*p+e*E+f*G;K=c*o+d*q+e*F+f*H;this.lineTo(J,K)}}return this}};

    // START LOADER IF NECESSARY
    if(this.props.triggerStart === 1)
      this.restartLoader();
  },

  restartLoader: function() {
    // PRELOAD GIF
    var checkGif = new Image();
    checkGif.src = "/img/infini_transparant.gif"+"?a="+Math.random();    // randomize source (needed for gif restart)

    // RESET startPt
    this.setState({'startPt':  0});

    // SHOW INFINITY SIGN
    $('#canvas').show();

    // DRAW FIRST FRAME ON CANVAS
    this.draw();

    // DRAW NEXT FRAMES AT GIVEN INTERVAL
    var step = 0.028;     // distance the line travels each frame
    var drawInterval = setInterval(() => {
      if (!this.isMounted())
        return;

      // GET INFINITY SIGN DOM ELEMENTS 
      var path = document.querySelector('#svg-path');

      // CLEAR INTERVAL IF SPINNER WAS UNMOUNTED DURING PROGRESS
      if(!path)
        clearInterval(drawInterval);

      var bezierLength = path.getTotalLength();

      // HANDLE OPEN CURVE
      if(this.state.startPt > 1)
        this.setState({'startPt': 2*step});   // '2' needed to account for two first frames of cycle already rendered
      else
        this.setState({'startPt': this.state.startPt + step});

      // DRAW CURRENT FRAME ON CANVAS
      this.draw();

      // CHANGE INF SIGN TO GIF WHEN progress==1
      if(this.props.progress === 1) {
        clearInterval(drawInterval);

        // HIDE INFINITY SIGN
        $('#canvas').hide();

        // SHOW FINISHED GIF
        var gif = document.getElementById('masas-loader-gif-finished');
        $('#masas-loader-gif-finished').show();
        gif.src = checkGif.src;     // restart gif
        
        // HIDE GIF AFTER ANIMATION
        var counter = 0;
        // var hideGifTimer = setInterval( () => {
        //   // do not execute function first time interval is called (at t=0 and not t=1s)
        //   if( counter > 0) {
        //     gif.src='';    // change source to force restting the gif
        //     $('#masas-loader-gif-finished').hide();

        //     clearInterval( hideGifTimer );

        //     // emit event once gif has finished animating 
        //     uploadEvents.emitEvent('masasLoaderFinished');
        //   }

        //   counter = counter + 1;
        // }, 1000);

        // HIDE INF SIGN
        $('#canvas').hide()
      }
    }, 42) ;
  },

  draw: function() { 
    
    var startPt = this.state.startPt; // time parameter on parametrized curve;  [0,1]; 
    var length = this.props.progress; // length of inf sign: [0,1]

    // GET DOM ELEMENTS
    var path = document.querySelector('#svg-path');
    var bezierLength = path.getTotalLength();
    var c=document.querySelector("#canvas");
    var ctx=c.getContext("2d");
    
    // MAGIC NUMBERS (for translation/scalling)
    var xTranslation = .1235*this.props.size;
    var yTranslation = 0.403333333*this.props.size;
    var xScale = (1-0.21)*this.props.size/300;
    var yScale = xScale;

    //  CLEAR SCREEN
    // magic numbers to smooth curve at top and left stationary pts. Remove to see effect on infty sign)
    ctx.clearRect(-500, -500, c.width*500, c.height*500);   
    
    // scale normalized inputs
    var curveLength = this.props.progress * bezierLength;
    startPt = startPt * bezierLength;
    
    // loop points to draw
    var i = 0;
    ctx.beginPath();

    var coord;    // store point
    var coordArray = [];    // store all points (curve drawn using this array)

    for (i=0; i < curveLength; i=i+10) {
      // OPEN CURVE HANDLING
      if(i + startPt > bezierLength) {
        coord = path.getPointAtLength(i + startPt - bezierLength); 
      } else {
        coord = path.getPointAtLength(i + startPt); 
      }
      // STORE POINTS IN ARRAY
      coordArray.push(xScale*coord.x+xTranslation);
      coordArray.push(yScale*coord.y+yTranslation);
    }

    // DRAW SMOOTH CURVE FROM POINTS
    ctx.curve(coordArray, 0.5, 4, 0);
    ctx.stroke();

    // CURVE STYLES
    ctx.strokeStyle = "#FFF";
    ctx.lineWidth = 2*this.props.size/100; // magic scaling number
    ctx.lineJoin = 'round';
    ctx.opacity=1;
    ctx.closePath();
  },
 
  render() {
    var translation = 100;
    return (
                  <div className="Masas-loader-container" style={{width: '100%'}}>
                    <div className="Masas-loader-infinity" style={{width: '100%', height: '100%'}}>
                        <canvas id="canvas"  width={this.props.size} height={this.props.size}>
                        </canvas>
                    </div>

                    <div className="Masas-loader-gif" style={{position: 'absolute', left: '50%', right: '50%', transform: 'translate(-50%, -50%)'}}>
                      <img style={{ height: this.props.size + 'px', position: 'absolute', left: '50%', right: '50%', transform: 'translate(-50%, 0%)'}} id="masas-loader-gif-finished"/>
                    </div>
                  
                    <svg enableBackground="new 0 0 500 500" id="svg" style={{display:'none', backgroundColor: 'grey', height: this.props.size + 'px', width: this.props.size + 'px'}}>
                        <path   id="svg-path"
                        transform={"translate(0 "+translation+")"}
                          fill="none" 
                          stroke="#4310C1" 
                          strokeWidth="10" 
                          strokeDasharray="700 700"
                          startOffset="200"
                          d="M-0.1,36c0-16.2,19.1-36,57-36   c34.4,0,66.1,20,86,36c19.9,16,54.1,36,89,36c40.9,0,56.9-19,57-36c0.1-16-15.9-36-57-36c-34.9,0-70.5,19.3-89,36   C124,53,91,72,56.9,72C19.4,72-0.1,53.3-0.1,36z"
                        />
                      </svg>
                  </div>

    );
  }
});

