#Game Engine
##About

Open Source HTML5 game engine with fast development as a goal.

Font made by <a href="http://www.kenney.nl/assets/kenney-fonts" target="_blank">Kenney Vleugels</a>.

This project is under the <a href="http://opensource.org/licenses/mit-license.php" target="_blank">MIT License</a>.

##Features
* Standalone library, no dependencies.
* Optional entity component system.
* Timers.
* Cameras.
* Rectangle collisions.
* Animations based on Sprite Sheets.
* Preloader.
* Audio, image and data loader.
* Custom bitmap font rendering.
* Adds more functions to the default Math library such a Vector2 class.
* Input class with check, pressed, and released functions for keyboard and mouse buttons/touch screen.
* Graphics class with low level drawing functions to draw shapes and images.

##Usage

Download or copy the library from the build/ folder to your project folder and include it in the head of your html file:

```html
<script src="GameEngine.min.js"></script>
```
Now you are ready to start making games!

##Development

This project is being developed with <a href="https://www.npmjs.com/" target="_blank">npm</a> and <a href="http://gruntjs.com/" target="_blank">grunt</a>.

Download the repository or clone it:

```bash
$ git clone https://github.com/davidllanos22/GameEngine.git
```
Once downloaded you will need to install all the npm packages dependencies:

```bash
$ npm install
```

###Build

If you want to compile the source files you can do it with the default grunt task:


```bash
$ grunt
```

Or with:

```bash
$ grunt build
```

These commands will also generate the documentation on the docs/ folder.


###Testing

If you want to test and develop at the same time you can do it with:

```bash
$ grunt serve
```

This will start a new web server at **`http://localhost:8888`** with the examples folder as root, where you can create your own project to test.

