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

  // Update button, called from Vorple
  updateButton: function(idx, disabled) {

    /* This data comes in backwards... */

    this.buttons[idx].enabled = ! disabled; /* May come in as 1/0 */
  },

  updateFloor: function(floor) {
    this.current = floor;
  },

  /* Draw current button state on to the elevator */
  drawPanel: function(canvas) {

    var ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const height = parseInt(canvas.getAttribute("height"));

    this.buttons.forEach(btn => {
      ctx.beginPath();
      ctx.arc(btn.x, height - btn.y, 20, 0, Math.PI * 2, false);

      if (btn.enabled) {
        ctx.stroke();
      } else {
        ctx.fill();
      }
    });
  },

  drawDial: function(canvas) {

    var ctx = canvas.getContext('2d');
    ctx.lineWidth = 1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();

    ctx.arc(canvas.height, canvas.width / 2, canvas.width / 2, Math.PI * 1, 0, false);

    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 10;

    ctx.moveTo(canvas.height, canvas.width / 2);

    /* Draw the hand */


    const floors = 4;

    const x = 150 * Math.cos(Math.PI + (Math.PI / floors) * this.current) + canvas.width / 2;
    const y = 150 * Math.sin(Math.PI + (Math.PI / floors) * this.current) + canvas.height;

    ctx.lineTo(x, y) // Going to need to calculate the line on the arc.

    ctx.stroke();
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