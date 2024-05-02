export default async function ChannelPage({
  params,
}: {
  params: { channelId: string }
}) {
  return <div>ChannelPage #{params.channelId}</div>
}
