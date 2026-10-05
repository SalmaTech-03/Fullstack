export function normalizeSpeechResult(event) {
    const results = [];

    for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
    ) {
        const result = event.results[i];

        results.push({
            text: result[0].transcript,
            isFinal: result.isFinal,
        });
    }

    return results;
}