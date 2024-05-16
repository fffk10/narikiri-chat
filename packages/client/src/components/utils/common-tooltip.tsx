import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'

type CommonTooltipProps = {
  contentText: string
  children: React.ReactNode
}

export default function CommonTooltip({
  contentText,
  children,
}: CommonTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{contentText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
