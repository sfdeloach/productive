## Angular Build Instructions

Build application from within its project folder. The `base href` should match the single page route
defined in the express `index.js` file:

    ng build --prod --base-href="/phosphorus"

Once build is complete, rename the `index.html` file to `phosphorus.html` in order to match the
defined route:

    app.get('/phosphorus', (req, res) =>
      res.sendFile(path.join(__dirname, 'views/phosphorus/phosphorus.html'))
    );

Move the `/angular/phosphorus/dist` folder and all of its contents to the `/view` folder. Make sure
the contents are made publicaly available in express:

    // public access to static files (CSS, images, JavaScript)
    app.use(express.static(path.join(__dirname, 'views/phosphorus')));
