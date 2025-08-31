<script lang="ts">
    export let selectedHex: Hex
</script>

<div>
    <div>
        <h3>Selected hex</h3>
        <div>
            <span>Cube coordinates:</span>
            <span>q: {selectedHex?.coordinates?.q}</span>
            <span>r: {selectedHex?.coordinates?.r}</span>
            <span>s: {selectedHex?.coordinates?.s}</span>
        </div>
    </div>
</div>