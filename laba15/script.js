anime({
    keyframes: [
      {translateY: -40},
      {translateX: 250},
      {translateY: 40},
      {translateX: 0},
      {translateY: 0}
    ],
    duration: 1000,
    easing: 'easeOutElastic(1, .8)',
    loop: true
    targets: '.animation-keyframes-demo .el',
  });