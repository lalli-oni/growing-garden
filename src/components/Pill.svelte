<script lang="ts">
    export let label: string
    // Hexadecimal color value for background
    export let backgroundColor: string 
    // Hexadecimal color value for foreground (default: white)
    export let textColor: string = "#ffffff"
</script>

<span style:background-color={backgroundColor} style:color={textColor}>{label}</span>

<style>
    span {
        padding: 0.3rem 0.5rem;
        border-radius: 5rem;
    }
</style>