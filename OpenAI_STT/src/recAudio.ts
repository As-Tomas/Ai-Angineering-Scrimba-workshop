import { stt } from './openai.ts'

// recAudio.ts
export function setupRecorder() {
    const startButton = document.getElementById('start') as HTMLButtonElement;
    const stopButton = document.getElementById('stop') as HTMLButtonElement;
    const audioElement = document.getElementById('audio') as HTMLAudioElement;
    const toTextButton = document.getElementById('toText') as HTMLButtonElement;

    let mediaRecorder: MediaRecorder;
    let audioBlob: Blob;

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);

            let audioChunks: BlobPart[] = [];
            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                audioElement.src = URL.createObjectURL(audioBlob);
                audioChunks = []; // Reset chunks for the next recording
            };

            startButton.onclick = () => {
                mediaRecorder.start();
                console.log('Recording started');
                startButton.disabled = true;
                stopButton.disabled = false;
            };

            stopButton.onclick = () => {
                mediaRecorder.stop();
                console.log('Recording stopped');
                startButton.disabled = false;
                stopButton.disabled = true;
            };

            toTextButton.onclick = () => {
                if (audioBlob) {
                    stt(audioBlob); // Assume stt function is modified to accept Blob
                } else {
                    console.error("No audio recorded or audioBlob is not available.");
                }
            };
        })
        .catch(error => {
            console.error('Error accessing the microphone:', error);
        });
}
