interface ChannelMessagePostRequest {
  /** チャンネルID */
  channelId: string
  /** メッセージ送信者ID */
  senderId: string
  /** メッセージ内容 */
  content: string
}
