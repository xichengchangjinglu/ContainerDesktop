/*!
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @link https://github.com/andersevenrud/vuensee
 * @license MIT
 */

import { createApp } from 'vue'
import i18n from './i18n'
import App from './components/App.vue'
import Input from './components/inputs/Input.vue'
import Textarea from './components/inputs/Textarea.vue'
import Dropdown from './components/inputs/Dropdown.vue'
import Range from './components/inputs/Range.vue'
import Button from './components/inputs/Button.vue'
import Checkbox from './components/inputs/Checkbox.vue'
import Icon from './components/icons/Icon.vue'
import SettingsIcon from './components/icons/SettingsIcon.vue'
import KeysIcon from './components/icons/KeysIcon.vue'
import ClipboardIcon from './components/icons/ClipboardIcon.vue'
import MinimizeIcon from './components/icons/MinimizeIcon.vue'
import MaximizeIcon from './components/icons/MaximizeIcon.vue'
import PowerIcon from './components/icons/PowerIcon.vue'
import DisconnectIcon from './components/icons/DisconnectIcon.vue'
import ConnectIcon from './components/icons/ConnectIcon.vue'
import DragIcon from './components/icons/DragIcon.vue'
import TouchKeyboardIcon from './components/icons/TouchKeyboardIcon.vue'
import ChevronIcon from './components/icons/ChevronIcon.vue'
import CheckIcon from './components/icons/CheckIcon.vue'
import ContainerItem from './views/ContainerManager/components/ContainerItem.vue'
import './assets/index.css'
import './assets/theme.css'
import router from './routers/index'
import { DatePicker } from "ant-design-vue";
// import 'ant-design-vue/dist/antd.css';
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(ElementPlus)
app.use(i18n)
app.use(router)
app.use(DatePicker)
app.component('Input', Input)
app.component('Textarea', Textarea)
app.component('Dropdown', Dropdown)
app.component('Range', Range)
app.component('Button', Button)
app.component('Checkbox', Checkbox)
app.component('Icon', Icon)
app.component('SettingsIcon', SettingsIcon)
app.component('KeysIcon', KeysIcon)
app.component('ClipboardIcon', ClipboardIcon)
app.component('MinimizeIcon', MinimizeIcon)
app.component('MaximizeIcon', MaximizeIcon)
app.component('PowerIcon', PowerIcon)
app.component('DisconnectIcon', DisconnectIcon)
app.component('ConnectIcon', ConnectIcon)
app.component('DragIcon', DragIcon)
app.component('TouchKeyboardIcon', TouchKeyboardIcon)
app.component('ChevronIcon', ChevronIcon)
app.component('CheckIcon', CheckIcon)
app.component('ContainerItem', ContainerItem)
app.mount('#app')
