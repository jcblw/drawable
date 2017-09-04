import Img from './image';
import Text from './text';
import Drawable from './drawable';

export default Drawable;

Drawable.image = (src, styles) => new Img(src, styles);
Drawable.text = (text, styles) => new Text(text, styles);
