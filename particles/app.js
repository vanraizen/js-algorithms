angular
    .module('mapper', [])
    .service('MagicParticles', function($interval, $document, $window, $log) {
        var clientWidth = $window.innerWidth,
            clientHeight = $window.innerHeight,
            particles = [],
            canvas = $document.find('canvas'),
            ctx = canvas[0].getContext('2d'),
            colors = ['red','green','blue'];

        function MagicParticle(iniX, iniY, radius, ctx) {

            this.x = iniX;
            this.y = iniY;
            this.ctx = ctx;

            this.randomize = function () {
                this.color = colors[Math.floor(Math.random()*4)];
                this.radius = radius * Math.random() + 1;
                this.yAcceleration = Math.random()*100 + 1;
                this.xAcceleration = Math.random()*25 - Math.random()*25 + 1;
            };

            this.randomize();

            this.draw = function (step) {

                var ctx = this.ctx,
                    stepSine = Math.sin(step),
                    intensityOffset = (step%10)/10,
                    x = this.x + this.xAcceleration,
                    y = this.y - this.yAcceleration,
                    i,
                    particle = this;

                this.x = x;
                if (y < 0) {
                    y = clientHeight;
                    this.x = Math.random() * clientWidth;
                    this.randomize();
                }
                this.y = y;

                function composeStarShape(radius) {

                    var boundaryDistance = (particle.radius - radius) / particle.radius,
                        intensity = Math.floor((255 * boundaryDistance) * intensityOffset),
                        lineColor = genColor();

                    ctx.beginPath();
                    ctx.moveTo(x-radius, y);
                    ctx.strokeStyle = lineColor;
                    ctx.quadraticCurveTo(x, y, x, y-radius);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(x+radius, y);
                    ctx.strokeStyle = lineColor;
                    ctx.quadraticCurveTo(x, y, x, y-radius);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(x+radius, y);
                    ctx.strokeStyle = lineColor;
                    ctx.quadraticCurveTo(x, y, x, y+radius);
                    ctx.stroke();

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
                    particles.push(new MagicParticle(Math.random()*clientWidth, 0, 20, ctx));
                }

                return this;

            },
            draw: function() {
                var step = 0;
                $interval(function() {
                    ++step;
                    ctx.clearRect(0, 0, clientWidth, clientHeight);
                    particles.forEach(function(particle) {
                        particle.draw(step);
                    })
                }, 50);
            }
        }
    })
    .controller('ParticlesController', function($scope, MagicParticles) {
        MagicParticles
            .generate(200)
            .draw();
    });