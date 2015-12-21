angular
    .module('app', [])
    .service('OrbParticles', function($interval, $document, $window) {
        var clientWidth = $window.innerWidth,
            clientHeight = $window.innerHeight,
            particles = [],
            canvas = $document.find('canvas'),
            ctx = canvas[0].getContext('2d');

        function OrbParticle(iniX, iniY, ctx) {

            this.x = iniX;
            this.y = iniY;
            this.lifeSpan = 0;

            this.accelleration = 1;
            this.polarity = 1;

            this.randomize = function () {
                this.maxAccelleration = 2.5 + (Math.random() * 2.5);
            };

            this.randomize();

            this.draw = function () {

                ++this.lifeSpan;

                if (this.lifeSpan % 5 === 0) {

                    this.accelleration = this.accelleration + this.polarity;
                    console.log(this.accelleration);

                    if (this.polarity === 1 && this.accelleration > this.maxAccelleration) {
                        this.polarity = -1;
                        this.randomize();
                    }
                    else if (this.polarity === -1 && this.accelleration < -this.maxAccelleration) {
                        this.polarity = 1;
                        this.randomize();
                    }
                } else {

                }

                this.x = this.x + (this.maxAccelleration - Math.abs(this.accelleration));
                this.y = this.y + this.accelleration;


                ctx.beginPath();
                ctx.arc(this.x, this.y, 7, 0, 2*Math.PI);
                ctx.fillStyle = 'blue';
                ctx.fill();
            };

            this.checkLocation = function () {
                if (this.x > clientWidth) {
                    this.x = clientWidth / 2;
                }
                if (this.y > clientHeight) {
                    this.y = clientHeight / 2;
                }
            }
        }

        return {
            generate: function(numberOfParticles) {

                var i;
                canvas.attr('height', clientHeight + 'px');
                canvas.attr('width', clientWidth + 'px');

                for (i = 0; i < numberOfParticles; i++) {
                    particles.push(new OrbParticle(clientWidth/2, clientHeight/2, ctx));
                }

                return this;

            },
            draw: function() {
                $interval(function() {
                    ctx.clearRect(0, 0, clientWidth, clientHeight);
                    particles.forEach(function(particle) {
                        particle.draw();
                        particle.checkLocation();
                    });
                }, 35);
            }
        }
    })
    .controller('ParticlesController', function($scope, OrbParticles) {
        OrbParticles
            .generate(20)
            .draw();
    });