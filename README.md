#Game Engine
##About

Open Source HTML5 game engine with fast development as a goal.

This project is under the [MIT License](http://opensource.org/licenses/mit-license.php)

##Features
* Standalone library, no dependencies.
* Entity component system.
* Scenes.
* Timers.
* Cameras.
* Rectangle collisions.
* Animations based on Sprite Sheets.
* State Machines.
* Preloader.
* Audio, Image and Data loader.
* Custom bitmap Font rendering.
* Math library with some utilities such a Vector2 class.
* Input class with check(), pressed(), and released() functions for keyboard and mouseButtons/touchScreen.
* Graphics class with some lowLevel drawing functions such as rect(),image(),imageSection().

##Usage

Download or copy the library from the build/ folder to your project folder and include it in the head of your html file:

```html
<script src="GameEngine.min.js"></script>
```
Now you are ready to start making games!

##Development

This project is being developed with [npm](https://www.npmjs.com/) and [grunt](http://gruntjs.com/).

Download the repository or clone it:

```bash
$ git clone https://github.com/davidllanos22/GameEngine.git
```
Once downloaded you will need to install all the npm packages being used:


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



###Testing

If you want to test and develop at the same time you can do it with:

```bash
$ grunt serve
```

This will start a new web server at **`http://localhost:8888`** with the examples folder as root, where you can create your own project to test.

