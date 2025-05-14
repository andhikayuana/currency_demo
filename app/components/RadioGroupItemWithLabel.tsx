import { Label, RadioGroup, SizeTokens, XStack } from "tamagui"

export function RadioGroupItemWithLabel(props: {
    size: SizeTokens
    value: string
    label: string
}) {
    const id = `radiogroup-${props.value}`
    return (
        <XStack alignItems="center" gap="$2">
            <RadioGroup.Item value={props.value} id={id} size={props.size}>
                <RadioGroup.Indicator />
            </RadioGroup.Item>

            <Label size={props.size} htmlFor={id}>
                {props.label}
            </Label>
        </XStack>
    )
}