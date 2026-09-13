import { Socketlib } from "./lib/socketlib.js";

export class CinematicSocket {
  static ID = "cinematic-cut-ins";
  static socket = null;

  static initialize() {
    // 1. 내장된 Socketlib 인스턴스 생성
    const library = new Socketlib();

    // 2. 우리 모듈 전용 소켓 등록
    this.socket = library.registerModule(this.ID);

    console.log("Cinematic FX | Internal Socket Channel Opened.");
  }

  /**
   * 소켓 핸들러 등록 (수신측)
   */
  static register(handlerName, func) {
    if (!this.socket) return;
    this.socket.register(handlerName, func);
  }

  /**
   * 모든 유저(나 포함)에게 실행 요청 (발신측)
   */
  static async executeForEveryone(handlerName, ...args) {
    if (!this.socket) return;
    return this.socket.executeForEveryone(handlerName, ...args);
  }
}
