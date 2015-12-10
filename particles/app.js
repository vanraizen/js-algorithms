angular
    .module('mapper', [])
    .service('MagicParticles', function($interval, $document, $window) {
        var clientWidth = $window.innerWidth,
            clientHeight = $window.innerHeight,
            particles = [],
            canvas = $document.find('canvas'),
            ctx = canvas[0].getContext('2d'),
            colors = ['red','green','blue'];

        function MagicParticle(iniX, iniY, radius, ctx) {

            this.x = iniX;
            this.y = iniY;

            this.randomize = function () {
                this.color = colors[Math.floor(Math.random()*4)];
                this.radius = radius * Math.random() + 1;
                //this.radius = radius;
                //this.yAcceleration = this.xAcceleration = 0;
                this.yAcceleration = 1;
                this.xAcceleration = Math.random()*5 - Math.random()*5;
                this.draws = 0;
                this.glimmers = this.xAcceleration > 0;
            };

            this.randomize();

            this.draw = function (step, wave) {

                ++this.draws;

                //wave is some decimal number that pulsates from 0-1

                var intensityOffset = wave,
                    x = this.x + this.xAcceleration,
                    y = this.y - this.yAcceleration  - this.draws/4,
                    i,
                    particle = this;

                if (y < 0 || x > clientWidth || x < 0) {
                    y = clientHeight;
                    x = (Math.random()*25)+clientWidth/2;
                    this.randomize();
                }
                this.x = x;
                this.y = y;

                function composeStarShape(radius) {

                    var boundaryDistance = (particle.radius - radius) / particle.radius,
                        intensity = particle.glimmers ? Math.floor((255 * boundaryDistance) * intensityOffset) : 0,
                        lineColor = genColor();

                    radius = (radius*(wave+particle.xAcceleration/4)) + (radius/4);

                    //top left quadrant
                    ctx.beginPath();
                    ctx.moveTo(x-radius, y);
                    ctx.strokeStyle = lineColor;
                    ctx.quadraticCurveTo(x, y, x, y-radius);
                    ctx.stroke();

                    //top right quadrant
                    ctx.beginPath();
                    ctx.moveTo(x+radius, y);
                    ctx.strokeStyle = lineColor;
                    ctx.quadraticCurveTo(x, y, x, y-radius);
                    ctx.stroke();

                    //bottom right quadrant
                    ctx.beginPath();
                    ctx.moveTo(x+radius, y);
                    ctx.strokeStyle = lineColor;
                    ctx.quadraticCurveTo(x, y, x, y+radius);
                    ctx.stroke();

                    //bottom left quadrant
                    ctx.beginPath();
                    ctx.moveTo(x-radius, y);
                    ctx.strokeStyle = lineColor;
                    ctx.quadraticCurveTo(x, y, x, y+radius);
                    ctx.stroke();

                    function genColor() {
                        if(particle.color == 'red') {
                            return "rgba(255,"+intensity+","+intensity+","+boundaryDistance+")";
                        } else if(particle.color == 'green') {
                            return "rgba("+intensity+",255,"+intensity+","+boundaryDistance+")";
                        } else if(particle.color == 'blue') {
                            return "rgba("+intensity+","+intensity+",255,"+boundaryDistance+")";
                        }
                    }
                }

                for (i = this.radius; i > 0; i--) {
                    composeStarShape(i);
                }
            };
        }

        return {
            generate: function(numberOfParticles) {

                var i;
                canvas.attr('height', clientHeight + 'px');
                canvas.attr('width', clientWidth + 'px');

                for (i = 0; i < numberOfParticles; i++) {
                    particles.push(new MagicParticle(clientWidth/2, Math.random()*clientHeight, 20, ctx));
                }

                return this;

            },
            draw: function() {
                var step = 0,
                    wave;
                $interval(function() {
                    ++step;
                    wave = (Math.sin(step/10)+1)/2;
                    ctx.clearRect(0, 0, clientWidth, clientHeight);
                    particles.forEach(function(particle) {
                        particle.draw(step, wave);
                    })
                }, 35);
            }
        }
    })
    .controller('ParticlesController', function($scope, MagicParticles) {
        MagicParticles
            .generate(100)
            .draw();
    });