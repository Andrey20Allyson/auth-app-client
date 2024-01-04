import Skeleton from "react-loading-skeleton";

export function CustomSkeleton(props: Parameters<typeof Skeleton>[0]) {
  return (
    <Skeleton
      highlightColor='#7f7d81'
      {...props}
    />
  )
}
