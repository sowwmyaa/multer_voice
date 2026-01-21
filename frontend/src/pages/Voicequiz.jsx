import { ReactMediaRecorder } from "react-media-recorder";
import { useState } from "react";
import api from "../api";

const questions = [
    "What makes you happy?",
    "Describe your best day",
    "One thing you love about yourself?",
];

export default function VoiceQuiz() {
    const [tempPaths, setTempPaths] = useState([null, null, null]);

    const uploadAudio = async (blob, index) => {
        const formData = new FormData();
        formData.append("voice", blob, `audio-${index}.webm`);

        const res = await api.post("/api/voice/upload-temp", formData);

        const updated = [...tempPaths];
        updated[index] = res.data.tempPath;
        setTempPaths(updated);
    };

    const submitAll = async () => {
        if (tempPaths.includes(null)) {
            alert("Please answer all questions");
            return;
        }

        await api.post("/api/voice/finalize", { tempPaths });
        window.location.href = "/success";
    };

    return (
        <div style={{ padding: 30 }}>
            <h2>Answer with Voice Notes 🎤</h2>

            {questions.map((q, i) => (
                <div key={i} style={{ marginBottom: 30 }}>
                    <h4>{q}</h4>

                    <ReactMediaRecorder
                        audio
                        render={({ startRecording, stopRecording, mediaBlobUrl }) => (
                            <>
                                <button onClick={startRecording}>Start</button>
                                <button onClick={stopRecording}>Stop</button>

                                {mediaBlobUrl && (
                                    <>
                                        <br />
                                        <audio src={mediaBlobUrl} controls />
                                        <br />
                                        <button
                                            onClick={async () => {
                                                const blob = await fetch(mediaBlobUrl).then((r) =>
                                                    r.blob()
                                                );
                                                uploadAudio(blob, i);
                                            }}
                                        >
                                            Upload Answer
                                        </button>
                                    </>
                                )}
                            </>
                        )}
                    />
                </div>
            ))}

            <button onClick={submitAll}>Submit All Answers</button>
        </div>
    );
}
