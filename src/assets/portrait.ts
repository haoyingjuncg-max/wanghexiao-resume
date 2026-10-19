// 人像数据拆成 p1/p2 两个模块：单文件推送受接口长度限制会截断，拆分后可完整传输。
import p1 from './portrait.p1'
import p2 from './portrait.p2'

const portrait = 'data:image/jpeg;base64,' + p1 + p2

export default portrait
