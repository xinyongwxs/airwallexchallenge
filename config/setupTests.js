import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jsdom-global/register';

Enzyme.configure({ adapter: new Adapter() });
console.log("set up start.");
global.shallow = shallow;
global.mount = mount;
global.render = render;
// global.render = render;
// global.mount = mount;
// console.log(typeof global.shallow);