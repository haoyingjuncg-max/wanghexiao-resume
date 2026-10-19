// portrait assembled from 4 chunks (split because a single large file gets truncated on push)
import q1 from './portrait.q1';
import q2 from './portrait.q2';
import q3 from './portrait.q3';
import q4 from './portrait.q4';

const portrait = 'data:image/jpeg;base64,' + q1 + q2 + q3 + q4;

export default portrait;
