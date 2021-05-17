/* Elevator.js - display and control the elevator panel. */

const elevator = {

  current: 0,

  radius: 20,

  /* State representing each of the buttons. */
  buttons: [
    {
      idx: 0, enabled: true, x: 50, y: 75
    },
    {
      idx: 1, enabled: true, x: 100, y: 75
    },
    {
      idx: 2, enabled: true, x: 50, y: 150
    },
    {
      idx: 3, enabled: true, x: 100, y: 150
    },
    {
      idx: 4, enabled: false, x: 75, y: 225
    }
  ],

  /* Draw current state on to the elevator */
  draw: function(canvas) {

    var ctx = canvas.getContext('2d');

    var e = this;

    const height = parseInt(canvas.getAttribute("height"));

    this.buttons.forEach(btn => {
      ctx.beginPath();
      ctx.arc(btn.x, height - btn.y, 20, 0, Math.PI * 2, false);
      ctx.stroke();
    });
  },

  bind: function(canvas, cmd) {

    canvas.addEventListener('click', (event) => {

      const height = parseInt(canvas.getAttribute("height"));

      const x = event.offsetX;
      const y = height - event.offsetY;

      /* Find collision of buttons */
      var collide = this.buttons.filter(btn => {
        const minX = btn.x - this.radius;
        const maxX = btn.x + this.radius;
        const minY = btn.y - this.radius;
        const maxY = btn.y + this.radius;

        return x > minX && x < maxX &&
               y > minY && y < maxY;
      });

      /* We could filter out enabled button,
          but let Vorple/story provide user feedback there. */
      collide.forEach((btn) => cmd(btn));

      collide.forEach((btn) => console.info(`Floor button ${btn.idx} clicked`));
    });



  },

};
window.elevator = elevator;