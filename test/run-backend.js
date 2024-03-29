const testConfig = require('./test-config.json')
// import backend from 'vue-selenium-unittest/backend.js'
import backend from 'vue-selenium-unittest/src/backend.js'
let normalKeys = '~!@#$%^&*()_+|}{POIUYTREWQASDFGHJKL:"?><MNBVCXZ"}'+"`1234567890-=\\][poiuytrewqasdfghjkl;'/.,mnbvcxz'"
let tests = {
  async all ({name, driver, Test, Key, By, until, Button, Origin}) {
    let keys = Object.keys(tests).filter(_ => _ !== 'all')
    for (let key of keys) {
      await tests[key]({name, driver, Test, Key, By, until, Button, Origin})
    }
  },
  'keyboard': async ({name, driver, Test, Key, By, until, Button, Origin}) => {
    let data, actions, input,c
    let rootSelector = "#keyboard-id"
    let interval = 50
    let app = await driver.findElement({id: 'app'})
    t = Test.block({name, rootSelector})
    await t.init()
    await t.initScroll()
    let root = await driver.findElement(By.css(rootSelector))
    let inputs = await root.findElements({tagName: 'input'})

    if(1&&(c="only keyboard")) {
      await t.changeComment('test simple input', 1000)
      input = inputs[0]
      await t.actions({actions: {click: input}})
      await t.actions({actions: "0123456789abcdefghABCDEFGH", interval})
      actions = [...Array(30).keys()].map(_ => Key.BACK_SPACE)
      await t.actions({actions, interval})

      await t.changeComment('test special keys', 1000)
      await t.actions({actions: [
        Key.CONTROL,
        Key.ALT,
        Key.COMMAND,
        Key.META,
        Key.SHIFT,
        Key.TAB,
        Key.TAB,
        Key.TAB,
        {keyDown: Key.SHIFT},
        Key.TAB,
        Key.TAB,
        {keyUp: Key.SHIFT},
        Key.TAB,
        Key.TAB,
        [{keyDown: Key.SHIFT}, Key.TAB, {keyUp: Key.SHIFT}],
        {sleep: 2000},
        [Key.SHIFT, Key.TAB],
        '01234567890',
        Key.BACK_SPACE,
        Key.BACK_SPACE,
        Key.BACK_SPACE,
        Key.ARROW_LEFT,
        Key.LEFT,
        Key.ARROW_LEFT,
        Key.LEFT,
        Key.ARROW_RIGHT,
        Key.RIGHT,
        Key.ARROW_DOWN,
        Key.DOWN,
        Key.ARROW_UP,
        Key.UP,
        Key.END,
        Key.HOME,
        Key.DELETE,
        Key.SPACE,

        Key.RETURN,
        Key.ENTER,
        Key.PAUSE,
        Key.INSERT,
        Key.ESCAPE,
        Key.PAGE_DOWN,
        Key.PAGE_UP,
      ], interval: 1000})
      await t.actions({actions: [
        Key.SEMICOLON,
        Key.EQUALS,
        Key.NUMPAD0,
        Key.NUMPAD1,
        Key.NUMPAD2,
        Key.NUMPAD3,
        Key.NUMPAD4,
        Key.NUMPAD5,
        Key.NUMPAD6,
        Key.NUMPAD7,
        Key.NUMPAD8,
        Key.NUMPAD9,
        Key.MULTIPLY,
        Key.ADD,
        Key.SEPARATOR,
        Key.SUBTRACT,
        Key.DECIMAL,
        Key.DIVIDE,
        // these keys do not work
        //Key.F1,
        //Key.F2,
        //Key.F3,
        //Key.F4,
        //Key.F5,
        //Key.F6,
        //Key.F7,
        //Key.F8,
        //Key.F9,
        //Key.F10,
        //Key.F11,
        //Key.F12,
      ], interval: 50})
      // key press not work now... wait for upstream to fix some bugs
      //await t.changeComment('key press', 1000)
      //await t.actions({actions: [
      //  "alskdjfalskjflaksjflsakjfd",
      //  {keyPress: Key.LEFT, duration: 1000}
      //], interval})
      await t.changeComment('clean input', 1000)
      await t.actions({actions: [
        [Key.CONTROL, 'a'],
        Key.BACK_SPACE,
      ], interval: 50})
    }
    if(1&&(c="keyboard and mouse")) {
      await t.actions({actions: [
        {doubleClick: inputs[0]},
        ['asdfasdfasdfasdfadsfasdfasdfasfasdf01234567890asdfasdfasdfasfasdf', Key.CONTROL, 'a'],
        {click: inputs[0]},
        {move: {x:-30}},
        [ {press: 'left'}, {move: {x:-30}} ],
        {move: {x:60}},
        {move: {x:-90}},
        {move: {x:120, duration: 5000}},
        {release: 'left'},
      ], interval: 1000})
    }

    await t.changeComment('all done', 2000)
    await t.changeComment('')
  },
  'mouse': async ({name, driver, Test, Key, By, until, Button, Origin}) => {
    let data, actions, input, c
    let rootSelector = "#mouse-id"
    let interval = 50
    t = Test.block({name, rootSelector})
    await t.init()
    await t.initScroll()
    let root = await driver.findElement(By.css(rootSelector))
    let buttons = await root.findElements(By.css('.iview-button'))
    if(1&&(c="click, doubleClick and rightClick")) {
      await t.changeComment(c, 1000)
      await t.actions({actions: [
        {click: buttons[0]},
        {click: buttons[1]},
        {click: buttons[2]},
        {click: buttons[3]},
        {doubleClick: buttons[0]},
        {doubleClick: buttons[0]},
        {contextClick: buttons[1]},
        {contextClick: buttons[1]},
        {contextClick: buttons[1]},
      ], interval: 1000})
    }
    if(1&&(c="move to element")) {
      await t.changeComment(c, 1000)
      await t.actions({actions: [
        {move: buttons[0]},
        {press: 'left'},
        {release: 'left'},
        {move: {x: 5, y: 1}},
        [{press: 'left'}, {release: 'left'}],
        {move: {x: 5, y: 1}},
        [{press: 'left'}, {release: 'left'}],
        {move: {x: 5, y: 1}},
        [{press: 'left'}, {release: 'left'}],
        {move: {x: 5, y: 1}},
        [{press: 'left'}, {release: 'left'}],
        {move: buttons[1]},
        [{press: 'left'}, {release: 'left'}],
        [{press: 'left'}, {release: 'left'}],
        {move: buttons[2]},
        {move: buttons[3]},
      ], interval: 1000})
    }
    if(1&&(c="color picker")) {
      await t.changeComment(c, 1000)
      let colorPicker = t.driver.findElement(By.css("#color-picker"))
      await t.actions({actions: [
        {click: colorPicker}
      ], interval: 1000})
      let colorPickerPanel = colorPicker.findElement(By.css(".ivu-color-picker-picker-panel"))
      await t.actions({actions: [
        {move: colorPickerPanel},
        [{press: 'left'}, {release: 'left'}],
        [{move: {x: 10, y: 10}}, {press: 'left'}, {release: 'left'}],
        [{move: {x: 20, y: 20}}, {press: 'left'}, {release: 'left'}],
        [{move: {x: 20, y: 20}}, {press: 'left'}, {release: 'left'}],
        [
          {move: {x: 20, y: 20}},
          {press: 'left'},
          {move: {x: -20, y: 20}},
          {move: {x: -20, y: 0}},
          {move: {x: -20, y: -30}},
          {move: {x: -10, y: -20}},
          {sleep: 2000},
        ],
        [
          {move: {x: -20, y: -20, step: 3, time: 2000}},
          {move: {x: -20, y: -20, step: 5, time: 2000}},
          {move: {x: -20, y: -20, step: 7}},
          {move: {x: -10, y: -20, step: 12}},
          {sleep: 2000},
          {release: 'left'},
        ],
      ], interval: 1000})
      let confirm = colorPicker.findElement(By.xpath("//*[contains(text(),'确定')]"))
      await t.actions({actions: [
        {click: confirm}
      ]})
    }
    if(1&&(c="split-trigger")) {
      await t.changeComment(c, 1000)
      let trigger = t.driver.findElement(By.css(".ivu-split-trigger"))
      await t.actions({actions: [
        [{move: trigger}, {press:'left'}, {move:{x:-50}}],
        {move:{x:-50}},
        {move:{x:100, step: 10, time: 2000}},
        {move:{x:-150}},
        {move:{x:200, step: 20, time: 2000}},
        {move:{x:-250}},
        {move:{x:300, step: 5, time: 2000}},
        {release: 'left'}
      ], interval: 100})
    }
    if(1&&(c="drop down")) {
      await t.changeComment(c, 1000)
      let drop0 = t.driver.findElement(By.css("#drop-hover"))
      let drop1 = t.driver.findElement(By.css("#drop-click"))
      let drop2 = t.driver.findElement(By.css("#drop-rclick"))
      await t.actions({actions: [
        {move: drop0},
        {move: drop1},
        {move: drop2},
        [{move: drop1}, {press:'left'}, {release: 'left'}],
        [{move: drop2}, {press:'left'}, {release: 'left'}],
        [{move: drop2}, {press:'right'}, {release: 'left'}],
        {click: drop2},
        {contextClick: drop2},
      ], interval: 2000})
    }
    await t.changeComment('all done', 2000)
    await t.changeComment('')
  },
  'mouse-smooth': async ({name, driver, Test, Key, By, until, Button, Origin}) => {
    let data, actions, input,c
    let rootSelector = "#mouse-smooth-id"
    let interval = 50
    let app = await driver.findElement({id: 'app'})
    t = Test.block({name, rootSelector})
    await t.init()
    await t.initScroll()
    let root = await driver.findElement(By.css(rootSelector))
    let draw = await root.findElement(By.css("#mydrawingboard"))
    await t.actions({actions: [
      [
        {sleep: 1000},
        {move: draw},
        {press: 'left'},
        {release: 'left'},
      ],
      [
        {press: 'left'},
        {move: {x: -123, y: 134}},
        {release: 'left'},
      ],
      [
        {press: 'left'},
        {move: {x: -171, y: -138, step: 15}},
        {release: 'left'},
      ],
      [
        {press: 'left'},
        {move: {x: 132, y:  -143, step: 17, time: 2000}},
        {release: 'left'},
      ],
      [
        {press: 'left'},
        {move: {x: 132, y: 143, step: 13, time: 2000}},
        {release: 'left'},
      ],
      [
        {press: 'left'},
        {move: {x: -100, y: 100}},
        {release: 'left'},
      ]
    ], interval: 1000})
    await t.changeComment('all done', 2000)
    await t.changeComment('')
  },
  'js': async ({name, driver, Test, Key, By, until, Button, Origin}) => {
    let data, actions, input,c
    let rootSelector = "#js-id"
    let interval = 50
    let app = await driver.findElement({id: 'app'})
    t = Test.block({name, rootSelector})
    await t.init()
    await t.initScroll()
    let root = await driver.findElement(By.css(rootSelector))
    let inputs = await root.findElements({tagName: 'input'})

    await t.changeComment('init test data', 1000)
    await t.actions({actions: [
      {click: inputs[0]},
      "0123456789abcdefghABCDEFGH",
      {click: inputs[1]},
      "aaaaaaaaaaaaaaaaaaaaaaaaaa",
      {click: inputs[2]},
      "bbbbbbbbbbbbbbbbbbbbbbbbbb",
      {click: inputs[3]},
      "cccccccccccccccccccccccccc",
    ]})

    await t.changeComment('js scrollTo (0,0)', 1000)
    await t.actions({actions: {js: 'window.scrollTo(0,0)'}})
    await t.changeComment('js scrollTo (0,1500)', 1000)
    await t.actions({actions: {js: 'window.scrollTo(0,1500)'}})

    await t.changeComment('js change value1', 2000)
    await t.actions({actions: {js: 'el.focus();el.value=12312', el:inputs[0]}})
    await t.changeComment('keyboard change value2', 2000)
    await t.actions({actions: [
      {doubleClick: inputs[1]},
      "blablablablablabla",
    ]})
    await t.changeComment('js change selection region', 2000)
    await t.actions({actions: {js: 'el.focus();el.selectionStart=10;el.selectionEnd=20;', el:inputs[2]}})
    await t.changeComment('delete selection region', 2000)
    await t.actions({actions: Key.BACK_SPACE})

    await t.changeComment('all done', 2000)
    await t.changeComment('')
  },
}
let t = new backend({options: testConfig, tests})
t.init()
