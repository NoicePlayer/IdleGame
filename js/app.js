// particlesJS.load('particles-js', 'assets/particles.json', function() {
//     console.log('callback - particles-js config loaded');
//   });

particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 0,
            "density": {
                "enable": false,
                "value_area": 800
            }
        },
        "color": {
            "value": "#000000"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 100,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 10,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 1500,
            "color": "#0000ff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "bounce",
            "bounce": true,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": false,
                "mode": "repulse"
            },
            "onclick": {
                "enable": false,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

// Add event listener for mouse click to create particle with specific velocity
$('#particles-js').on('click', function(event) {
    let pJS = window.pJSDom[0].pJS;
    let pos = {pos_x: $(this).position().left,  pos_y: $(this).position().top};
    let nb = 1;

    // pJS.fn.modes.pushParticles(1, pos);

    // Create a particle with specific properties
    // pJS.particles.array.push({
    //     x: mouseX,
    //     y: mouseY,
    //     radius: pJS.particles.size.value,
    //     color: pJS.particles.color.value,
    //     opacity: pJS.particles.opacity.value,
    //     velocity: {
    //         x: (Math.random() - 0.5) * 5, // Custom velocity for x
    //         y: (Math.random() - 0.5) * 5  // Custom velocity for y
    //     },
    //     size_status: true,
    //     opacity_status: true,
    //     shape: pJS.particles.shape.type
    // });

    // Update particles
    // pJS.fn.particlesRefresh();

        pJS.tmp.pushing = true;
    

          pJS.particles.array.push(
            new pJS.fn.particle(
              pJS.particles.color,
              pJS.particles.opacity.value,
              {
                'x': event.clientX,
                'y': event.clientY
              },
              {vel_x: 5, vel_y: 0}
            )
          );

            if(!pJS.particles.move.enable){
              pJS.fn.particlesDraw();
            }
            pJS.tmp.pushing = false;
          
        
    

});

