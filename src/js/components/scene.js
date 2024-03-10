import {
  Color,
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Mesh,
  SphereGeometry,
  PlaneGeometry,
  MeshLambertMaterial,
  DirectionalLight,
  AmbientLight,
  CircleGeometry,
  TextureLoader,
  AxesHelper,
  Vector3,
  Raycaster

} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Reflector } from 'three/addons/objects/Reflector.js'
import { InteractionManager } from 'three.interactive'

import Stats from 'stats-js'
import LoaderManager from '@/js/managers/LoaderManager'
import GUI from 'lil-gui'

export default class MainScene {
  #canvas
  #renderer
  #scene
  #camera
  #controls
  #stats
  #width
  #height
  #mesh
  #poster1
  #poster2
  #poster3
  #poster4
  #poster5
  #poster6
  #poster7
  #poster8
  #poster9
  #poster10
  #poster11
  #poster12
  #posters
  #interactionManager
  #guiObj = {
    y: 0,
    showTitle: true,
  }

  constructor() {
    this.#canvas = document.querySelector('.scene')

    this.init()
  }

  init = async () => {
    // Preload assets before initiating the scene
    const assets = [
      {
        name: 'matcap',
        texture: './img/matcap.png',
      },
    ]

    await LoaderManager.load(assets)

    //this.setStats()
    //this.setGUI()
    this.setScene()
    this.setRender()
    this.setCamera()
    this.setControls()
    //this.setAxesHelper()

    this.setSphere()
    this.setLights()
    this.handleResize()
    this.setReflector()
    this.setSelect()

    // start RAF
    this.events()
  }

  /**
   * Our Webgl renderer, an object that will draw everything in our canvas
   * https://threejs.org/docs/?q=rend#api/en/renderers/WebGLRenderer
   */
  setRender() {
    this.#renderer = new WebGLRenderer({
      canvas: this.#canvas,
      antialias: true,
    })
    
  
  }

  /**
   * This is our scene, we'll add any object
   * https://threejs.org/docs/?q=scene#api/en/scenes/Scene
   */
  setScene() {
    this.#scene = new Scene()
    this.#scene.background = new Color(0x000000)
  }

  /**
   * Our Perspective camera, this is the point of view that we'll have
   * of our scene.
   * A perscpective camera is mimicing the human eyes so something far we'll
   * look smaller than something close
   * https://threejs.org/docs/?q=pers#api/en/cameras/PerspectiveCamera
   */
  setCamera() {
    const aspectRatio = this.#width / this.#height
    const fieldOfView = 60
    const nearPlane = 0.1
    const farPlane = 10000

    this.#camera = new PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane)
    this.#camera.position.y = 0.2
    this.#camera.position.x = 4
    this.#camera.position.z = 4.5
    this.#camera.lookAt(0, 0, -1)

    this.#scene.add(this.#camera)
  }
  
  /**
   * Threejs controls to have controls on our scene
   * https://threejs.org/docs/?q=orbi#examples/en/controls/OrbitControls
   */
  setControls() {
    this.#controls = new OrbitControls(this.#camera, this.#renderer.domElement)
    this.#controls.enableDamping = true
    // this.#controls.dampingFactor = 0.04
  }
  
  /**
   * Axes Helper
   * https://threejs.org/docs/?q=Axesh#api/en/helpers/AxesHelper
   */
  setAxesHelper() {
    const axesHelper = new AxesHelper(3)
    this.#scene.add(axesHelper)
  }

  /**
   * Create a SphereGeometry
   * https://threejs.org/docs/?q=box#api/en/geometries/SphereGeometry
   * with a Basic material
   * https://threejs.org/docs/?q=mesh#api/en/materials/MeshBasicMaterial
   */
  setSphere() {
    //const geometry = new SphereGeometry(1, 32, 32)
    const material = new MeshLambertMaterial({color: '#ffffff' })
    //poster1
    const posterplane1 = new PlaneGeometry( 0.85, 1.1 )
    const t_poster1 = new TextureLoader().load('/filmjournalarchive/textureImages/wayDownEastPoster.jpg' )
    const m_poster1 = new MeshLambertMaterial( { map:t_poster1 } )
    this.#poster1 = new Mesh(posterplane1, m_poster1)
    this.#poster1.position.y = 1
    this.#poster1.position.x = -6
    this.#poster1.position.z = 3
    this.#scene.add(this.#poster1)
    this.#posters = []
    this.#posters.push(this.#poster1)
    //poster2
    const posterplane2 = new PlaneGeometry( 0.85, 1.1 )
    const t_poster2 = new TextureLoader().load('/filmjournalarchive/textureImages/rearWindowPoster.jpg' )
    const m_poster2 = new MeshLambertMaterial( { map:t_poster2 } )
    this.#poster2 = new Mesh(posterplane2, m_poster2)
    this.#poster2.position.y = 1
    this.#poster2.position.x = -4.8
    this.#poster2.position.z = 3
    this.#scene.add(this.#poster2)
    this.#posters.push(this.#poster2)
    //poster3
    const posterplane3 = new PlaneGeometry( 0.85, 1.1 )
    const t_poster3 = new TextureLoader().load('/filmjournalarchive/textureImages/thePianoPoster.jpg' )
    const m_poster3 = new MeshLambertMaterial( { map:t_poster3 } )
    this.#poster3 = new Mesh(posterplane3, m_poster3)
    this.#poster3.position.y = 1
    this.#poster3.position.x = -3.6
    this.#poster3.position.z = 3
    this.#scene.add(this.#poster3)
    this.#posters.push(this.#poster3)
    //poster4
    const posterplane4 = new PlaneGeometry( 0.85, 1.1 )
    const t_poster4 = new TextureLoader().load('/filmjournalarchive/textureImages/nosferatuPoster.jpg' )
    const m_poster4 = new MeshLambertMaterial( { map:t_poster4 } )
    this.#poster4 = new Mesh(posterplane4, m_poster4)
    this.#poster4.position.y = 1
    this.#poster4.position.x = -2.4
    this.#poster4.position.z = 3
    this.#scene.add(this.#poster4)
    this.#posters.push(this.#poster4)
    //poster5
    const posterplane5 = new PlaneGeometry( 0.85, 1.1 )
    const t_poster5 = new TextureLoader().load('/filmjournalarchive/textureImages/metropolisPoster.jpg' )
    const m_poster5 = new MeshLambertMaterial( { map:t_poster5 } )
    this.#poster5 = new Mesh(posterplane5, m_poster5)
    this.#poster5.position.y = 1
    this.#poster5.position.x = -1.2
    this.#poster5.position.z = 3
    this.#scene.add(this.#poster5)
    this.#posters.push(this.#poster5)
    //poster6
    const posterplane6 = new PlaneGeometry( 0.85, 1.1 )
    const t_poster6 = new TextureLoader().load('/filmjournalarchive/textureImages/theMurderersAreAmongUsPoster.jpg' )
    const m_poster6 = new MeshLambertMaterial( { map:t_poster6 } )
    this.#poster6 = new Mesh(posterplane6, m_poster6)
    this.#poster6.position.y = 1
    this.#poster6.position.x = 0
    this.#poster6.position.z = 3
    this.#scene.add(this.#poster6)
    this.#posters.push(this.#poster6)
    //poster7
    const posterplane7 = new PlaneGeometry( 0.85, 1.1 )
    const t_poster7 = new TextureLoader().load('/filmjournalarchive/textureImages/theBridgePoster.jpg' )
    const m_poster7 = new MeshLambertMaterial( { map:t_poster7 } )
    this.#poster7 = new Mesh(posterplane7, m_poster7)
    this.#poster7.position.y = 1
    this.#poster7.position.x = 1.2
    this.#poster7.position.z = 3
    this.#scene.add(this.#poster7)
    this.#posters.push(this.#poster7)
    //poster8
    const posterplane8 = new PlaneGeometry( 0.85, 1.1 )
    const t_poster8 = new TextureLoader().load('/filmjournalarchive/textureImages/theSecondTrackPoster.jpg' )
    const m_poster8 = new MeshLambertMaterial( { map:t_poster8 } )
    this.#poster8 = new Mesh(posterplane8, m_poster8)
    this.#poster8.position.y = 1
    this.#poster8.position.x = 2.4
    this.#poster8.position.z = 3
    this.#scene.add(this.#poster8)
    this.#posters.push(this.#poster8)
    //poster9
    const posterplane9 = new PlaneGeometry( 0.85, 1.1 )
    const t_poster9 = new TextureLoader().load('/filmjournalarchive/textureImages/eolomeaPoster.jpg' )
    const m_poster9 = new MeshLambertMaterial( { map:t_poster9 } )
    this.#poster9 = new Mesh(posterplane9, m_poster9)
    this.#poster9.position.y = 1
    this.#poster9.position.x = 3.6
    this.#poster9.position.z = 3
    this.#scene.add(this.#poster9)
    this.#posters.push(this.#poster9)
    //poster10
    const posterplane10 = new PlaneGeometry( 0.85, 1.1 )
    const t_poster10 = new TextureLoader().load('/filmjournalarchive/textureImages/dasBootPoster.jpg' )
    const m_poster10 = new MeshLambertMaterial( { map:t_poster10 } )
    this.#poster10 = new Mesh(posterplane10, m_poster10)
    this.#poster10.position.y = 1
    this.#poster10.position.x = 4.8
    this.#poster10.position.z = 3
    this.#scene.add(this.#poster10)
    this.#posters.push(this.#poster10)
    //poster11
    const posterplane11 = new PlaneGeometry( 0.85, 1.1 )
    const t_poster11 = new TextureLoader().load('/filmjournalarchive/textureImages/downfallPoster.jpg' )
    const m_poster11 = new MeshLambertMaterial( { map:t_poster11 } )
    this.#poster11 = new Mesh(posterplane11, m_poster11)
    this.#poster11.position.y = 1
    this.#poster11.position.x = 6
    this.#poster11.position.z = 3
    this.#scene.add(this.#poster11)
    this.#posters.push(this.#poster11)
    //poster12
    const posterplane12 = new PlaneGeometry( 0.85, 1.1 )
    const t_poster12 = new TextureLoader().load('/filmjournalarchive/textureImages/germanyPaleMotherPoster.jpg' )
    const m_poster12 = new MeshLambertMaterial( { map:t_poster12 } )
    this.#poster12 = new Mesh(posterplane12, m_poster12)
    this.#poster12.position.y = 1
    this.#poster12.position.x = 7.2
    this.#poster12.position.z = 3
    this.#scene.add(this.#poster12)
    this.#posters.push(this.#poster12)
  }

  setLights() {
    const directionalLight = new DirectionalLight(0xffffff, 0.5)
    directionalLight.position.x = 1
    this.#scene.add(directionalLight)
    const ambientLight = new AmbientLight(0xffffff)
    this.#scene.add(ambientLight)
  }
  
  setReflector() {
    let geometry, material;

				geometry = new CircleGeometry( 20, 64 );
				this.groundMirror = new Reflector( geometry, {
					clipBias: 0.003,
					textureWidth: window.innerWidth * window.devicePixelRatio,
					textureHeight: window.innerHeight * window.devicePixelRatio,
					color: 0xb5b5b5
				} );
				this.groundMirror.position.y = 0;
				this.groundMirror.rotateX( - Math.PI / 2 );
				this.#scene.add(this.groundMirror);
  }

  setSelect() {
    this.#interactionManager = new InteractionManager(
      this.#renderer,
      this.#camera,
      this.#renderer.domElement
    );
    
    
    this.#poster1.addEventListener('mouseover', (event) => {
      //event.target.material.color.set(0xff2200);
      event.target.scale.set(1.5, 1.5, 1.5);
      document.body.style.cursor = 'pointer';
    });
    this.#poster1.addEventListener('mouseout', (event) => {
      //event.target.material.color.set(0xffffff);
      event.target.scale.set(1.0, 1.0, 1.0);
      document.body.style.cursor = 'default';
    });
    
    this.#poster1.addEventListener('mousedown', (event) => {
      event.target.scale.set(1.6,1.6, 1.6);
    });
    this.#poster1.addEventListener('click', (event) => {
      event.target.scale.set(1.5, 1.5, 1.5);
      window.location.href = 'https://raefu.com/filmjournalarchive/waydowneast.html'
    });
    
    this.#interactionManager.add(this.#poster1)
    
    //poster2
    this.#poster2.addEventListener('mouseover', (event) => {
      event.target.scale.set(1.5, 1.5, 1.5);
      document.body.style.cursor = 'pointer';
    });
    this.#poster2.addEventListener('mouseout', (event) => {
      event.target.scale.set(1.0, 1.0, 1.0);
      document.body.style.cursor = 'default';
    });
    
    this.#poster2.addEventListener('mousedown', (event) => {
      event.target.scale.set(1.6,1.6, 1.6);
    });
    this.#poster2.addEventListener('click', (event) => {
      event.target.scale.set(1.5, 1.5, 1.5);
      window.location.href = 'https://raefu.com/filmjournalarchive/rearwindow.html'
    });
    this.#interactionManager.add(this.#poster2)

    //poster3
    this.#poster3.addEventListener('mouseover', (event) => {
      event.target.scale.set(1.5, 1.5, 1.5);
      document.body.style.cursor = 'pointer';
    });
    this.#poster3.addEventListener('mouseout', (event) => {
      event.target.scale.set(1.0, 1.0, 1.0);
      document.body.style.cursor = 'default';
    });
    this.#poster3.addEventListener('mousedown', (event) => {
      event.target.scale.set(1.6,1.6, 1.6);
    });
    this.#poster3.addEventListener('click', (event) => {
      event.target.scale.set(1.5, 1.5, 1.5);
      window.location.href = 'https://raefu.com/filmjournalarchive/thepiano.html'
    });
    this.#interactionManager.add(this.#poster3)

    //poster4
    this.#poster4.addEventListener('mouseover', (event) => {
      event.target.scale.set(1.5, 1.5, 1.5);
      document.body.style.cursor = 'pointer';
    });
    this.#poster4.addEventListener('mouseout', (event) => {
      event.target.scale.set(1.0, 1.0, 1.0);
      document.body.style.cursor = 'default';
    });
    this.#poster4.addEventListener('mousedown', (event) => {
      event.target.scale.set(1.6,1.6, 1.6);
    });
    this.#poster4.addEventListener('click', (event) => {
      event.target.scale.set(1.5, 1.5, 1.5);
      window.location.href = 'https://raefu.com/filmjournalarchive/nosferatu.html'
    });
    this.#interactionManager.add(this.#poster4)

    //poster5
    this.#poster5.addEventListener('mouseover', (event) => {
      event.target.scale.set(1.5, 1.5, 1.5);
      document.body.style.cursor = 'pointer';
    });
    this.#poster5.addEventListener('mouseout', (event) => {
      event.target.scale.set(1.0, 1.0, 1.0);
      document.body.style.cursor = 'default';
    });
    this.#poster5.addEventListener('mousedown', (event) => {
      event.target.scale.set(1.6,1.6, 1.6);
    });
    this.#poster5.addEventListener('click', (event) => {
      event.target.scale.set(1.5, 1.5, 1.5);
      window.location.href = 'https://raefu.com/filmjournalarchive/metropolis.html'
    });
    this.#interactionManager.add(this.#poster5)

    //poster6
    this.#poster6.addEventListener('mouseover', (event) => {
      event.target.scale.set(1.5, 1.5, 1.5);
      document.body.style.cursor = 'pointer';
    });
    this.#poster6.addEventListener('mouseout', (event) => {
      event.target.scale.set(1.0, 1.0, 1.0);
      document.body.style.cursor = 'default';
    });
    this.#poster6.addEventListener('mousedown', (event) => {
      event.target.scale.set(1.6,1.6, 1.6);
    });
    this.#poster6.addEventListener('click', (event) => {
      event.target.scale.set(1.5, 1.5, 1.5);
      window.location.href = 'https://raefu.com/filmjournalarchive/themurderersareamongus.html'
    });
    this.#interactionManager.add(this.#poster6)

    //poster7
    this.#poster7.addEventListener('mouseover', (event) => {
      event.target.scale.set(1.5, 1.5, 1.5);
      document.body.style.cursor = 'pointer';
    });
    this.#poster7.addEventListener('mouseout', (event) => {
      event.target.scale.set(1.0, 1.0, 1.0);
      document.body.style.cursor = 'default';
    });
    this.#poster7.addEventListener('mousedown', (event) => {
      event.target.scale.set(1.6,1.6, 1.6);
    });
    this.#poster7.addEventListener('click', (event) => {
      event.target.scale.set(1.5, 1.5, 1.5);
      window.location.href = 'https://raefu.com/filmjournalarchive/thebridge.html'
    });
    this.#interactionManager.add(this.#poster7)

    //poster8
    this.#poster8.addEventListener('mouseover', (event) => {
      event.target.scale.set(1.5, 1.5, 1.5);
      document.body.style.cursor = 'pointer';
    });
    this.#poster8.addEventListener('mouseout', (event) => {
      event.target.scale.set(1.0, 1.0, 1.0);
      document.body.style.cursor = 'default';
    });
    this.#poster8.addEventListener('mousedown', (event) => {
      event.target.scale.set(1.6,1.6, 1.6);
    });
    this.#poster8.addEventListener('click', (event) => {
      event.target.scale.set(1.5, 1.5, 1.5);
      window.location.href = 'https://raefu.com/filmjournalarchive/thesecondtrack.html'
    });
    this.#interactionManager.add(this.#poster8)

    //poster9
    this.#poster9.addEventListener('mouseover', (event) => {
      event.target.scale.set(1.5, 1.5, 1.5);
      document.body.style.cursor = 'pointer';
    });
    this.#poster9.addEventListener('mouseout', (event) => {
      event.target.scale.set(1.0, 1.0, 1.0);
      document.body.style.cursor = 'default';
    });
    this.#poster9.addEventListener('mousedown', (event) => {
      event.target.scale.set(1.6,1.6, 1.6);
    });
    this.#poster9.addEventListener('click', (event) => {
      event.target.scale.set(1.5, 1.5, 1.5);
      window.location.href = 'https://raefu.com/filmjournalarchive/eolomea.html'
    });
    this.#interactionManager.add(this.#poster9)

    //poster10
    this.#poster10.addEventListener('mouseover', (event) => {
      event.target.scale.set(1.5, 1.5, 1.5);
      document.body.style.cursor = 'pointer';
    });
    this.#poster10.addEventListener('mouseout', (event) => {
      event.target.scale.set(1.0, 1.0, 1.0);
      document.body.style.cursor = 'default';
    });
    this.#poster10.addEventListener('mousedown', (event) => {
      event.target.scale.set(1.6,1.6, 1.6);
    });
    this.#poster10.addEventListener('click', (event) => {
      event.target.scale.set(1.5, 1.5, 1.5);
      window.location.href = 'https://raefu.com/filmjournalarchive/dasboot.html'
    });
    this.#interactionManager.add(this.#poster10)

    //poster11
    this.#poster11.addEventListener('mouseover', (event) => {
      event.target.scale.set(1.5, 1.5, 1.5);
      document.body.style.cursor = 'pointer';
    });
    this.#poster11.addEventListener('mouseout', (event) => {
      event.target.scale.set(1.0, 1.0, 1.0);
      document.body.style.cursor = 'default';
    });
    this.#poster11.addEventListener('mousedown', (event) => {
      event.target.scale.set(1.6,1.6, 1.6);
    });
    this.#poster11.addEventListener('click', (event) => {
      event.target.scale.set(1.5, 1.5, 1.5);
      window.location.href = 'https://raefu.com/filmjournalarchive/downfall.html'
    });
    this.#interactionManager.add(this.#poster11)

    //poster12
    this.#poster12.addEventListener('mouseover', (event) => {
      event.target.scale.set(1.5, 1.5, 1.5);
      document.body.style.cursor = 'pointer';
    });
    this.#poster12.addEventListener('mouseout', (event) => {
      event.target.scale.set(1.0, 1.0, 1.0);
      document.body.style.cursor = 'default';
    });
    this.#poster12.addEventListener('mousedown', (event) => {
      event.target.scale.set(1.6,1.6, 1.6);
    });
    this.#poster12.addEventListener('click', (event) => {
      event.target.scale.set(1.5, 1.5, 1.5);
      window.location.href = 'https://raefu.com/filmjournalarchive/germanypalemother.html'
    });
    this.#interactionManager.add(this.#poster12)
  }
  /**
   * Build stats to display fps
   */
  setStats() {
    this.#stats = new Stats()
    this.#stats.showPanel(0)
    document.body.appendChild(this.#stats.dom)
  }

  setGUI() {
    const titleEl = document.querySelector('.main-title')

    const handleChange = () => {
      this.#mesh.position.y = this.#guiObj.y
      titleEl.style.display = this.#guiObj.showTitle ? 'block' : 'none'
    }

    const gui = new GUI()
    gui.add(this.#guiObj, 'y', -3, 3).onChange(handleChange)
    gui.add(this.#guiObj, 'showTitle').name('show title').onChange(handleChange)
  }
  /**
   * List of events
   */
  events() {
    window.addEventListener('resize', this.handleResize, { passive: true })
    this.draw(0)
  }
  
  // EVENTS

  /**
   * Request animation frame function
   * This function is called 60/time per seconds with no performance issue
   * Everything that happens in the scene is drawed here
   * @param {Number} now
   */
  draw = () => {
    // now: time in ms
    //this.#stats.begin()
    this.#interactionManager.update();
    //if (this.#controls) this.#controls.update() // for damping
    this.#renderer.render(this.#scene, this.#camera)


    
    //this.#stats.end()
    this.raf = window.requestAnimationFrame(this.draw)
  }

  /**
   * On resize, we need to adapt our camera based
   * on the new window width and height and the renderer
   */
  handleResize = () => {
    this.#width = window.innerWidth
    this.#height = window.innerHeight

    // Update camera
    this.#camera.aspect = this.#width / this.#height
    this.#camera.updateProjectionMatrix()

    const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1

    this.#renderer.setPixelRatio(DPR)
    this.#renderer.setSize(this.#width, this.#height)
  }

  
}
