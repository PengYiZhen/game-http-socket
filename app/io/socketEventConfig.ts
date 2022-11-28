/**
 * 定义 socket 房间及 连接 事件功能
 * 请配置 好 interface socketIO 关联事件 
 */

// declare interface GameSocketEvent {
//     connection?: string,
//     self?: string,
//     gameRoom1?: string,
//     error?: string,
// }

export const socketEvent = {
   connection: 'connection',
   self: 'message', // 默认
   gameRoom1: 'pyz msg', // 房间 1 事件 可以对其进行 openid 融合 或者 随机 处理
   error: 'error', // 错误事件
}