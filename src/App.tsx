import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useState, useRef, useEffect, useCallback } from "react";
import ReactPlayer from "react-player";
import videojs from "video.js";
import VideoJS from "./VideoJS";
import { saveAs, readAsText } from "file-saver";

export default function App() {
  const [videoList, setVideoList] = useState<
    Array<{
      index: number;
      videoBlob: string;
    }>
  >([]);
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef(null);
  const messageRef = useRef(null);
  const inputRef = useRef(null);
  const [blobLink, setBlobLink] = useState("");

  function handleSaveFile(file: Blob, fileName: string) {
    saveAs(file, fileName);
  }

  const load = async () => {
    try {
      const baseURL = "../ffmpeg";
      const ffmpeg = ffmpegRef.current;
      ffmpeg.on("log", ({ message }) => {
        messageRef.current.innerHTML = message;
        console.log(message);
      });
      console.log("here");
      // toBlobURL is used to bypass CORS issue, urls with the same
      // domain can be used directly.
      await ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          "text/javascript"
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          "application/wasm"
        ),
        workerURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.worker.js`,
          "text/javascript"
        ),
      });
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const transcodeToHLS = async () => {
    const startTime = Date.now();
    const startMemory = performance.memory.usedJSHeapSize;
    try {
      const file = inputRef.current?.files?.[0];
      if (!file) {
        alert("Please select a file first.");
        return;
      }
      const ffmpeg = ffmpegRef.current;
      await ffmpeg.writeFile(
        "input.mp4",
        new Uint8Array(await file.arrayBuffer())
      );

      // Run FFmpeg command to convert MP4 to HLS
      await ffmpeg.exec(["-i", "input.mp4", "output.flv"]);

      // hls file
      // Read the generated files
      const m3u8File = await ffmpeg.readFile("output.m3u8");
      const tsFiles = [];
      for (let i = 0; ; i++) {
        try {
          const tsFile = await ffmpeg.readFile(`output${i}.ts`);
          tsFiles.push(new Blob([tsFile.buffer], { type: "video/mp2t" }));
        } catch (error) {
          // No more .ts files to read
          break;
        }
      }

      // Create URLs for the .m3u8 and .ts files
      const m3u8URL = URL.createObjectURL(
        new Blob([m3u8File.buffer], { type: "application/x-mpegURL" })
      );
      const tsFileURLs = tsFiles.map((file) => URL.createObjectURL(file));

      // For demonstration purposes, log the URLs to the console
      console.log("M3U8 URL:", m3u8URL);
      tsFileURLs.forEach((url, index) =>
        console.log(`TS File ${index} URL:`, url)
      );

      setBlobLink(m3u8URL);
      // Set the video source to the M3U8 URL
      if (videoRef.current !== null) {
        // videoRef.current.src = m3u8URL;
        videoRef.current.src = m3u8URL;
      }
    } catch (error) {
      console.error("Error:", error);
    }
    const endTime = Date.now();
    const endMemory = performance.memory.usedJSHeapSize;

    console.log("Time taken:", endTime - startTime, "ms");
    const memoryUsage = endMemory - startMemory;
    console.log(`Memory usage: ${memoryUsage} bytes`);
  };

  const transcodeToFLV = async () => {
    const startTime = Date.now();
    const startMemory = performance.memory.usedJSHeapSize;
    try {
      const file = inputRef.current?.files?.[0];
      if (!file) {
        alert("Please select a file first.");
        return;
      }
      const ffmpeg = ffmpegRef.current;
      await ffmpeg.writeFile(
        "input.mp4",
        new Uint8Array(await file.arrayBuffer())
      );

      // Run FFmpeg command to convert MP4 to HLS
      await ffmpeg.exec(["-i", "input.mp4", "output.flv"]);

      //flv file
      const flvFile = await ffmpeg.readFile("output.flv");
      const flvBlob = new Blob([flvFile.buffer], { type: "video/x-flv" });
      const flvURL = URL.createObjectURL(flvBlob);
      console.log("FLV URL:", flvURL);

      setBlobLink(flvURL);

      setVideoList((prev) => {
        return [
          ...prev,
          {
            index: prev.length,
            videoBlob: flvURL,
          },
        ];
      });

      // Set the video source to the M3U8 URL
      if (videoRef.current !== null) {
        // videoRef.current.src = m3u8URL;
        videoRef.current.src = flvURL;
      }

      handleSaveFile(flvBlob, "output.flv");

      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const fileContent = e.target?.result;
        console.log("File content:", fileContent);
      };
    } catch (error) {
      console.error("Error:", error);
    }
    const endTime = Date.now();
    const endMemory = performance.memory.usedJSHeapSize;

    console.log("Time taken:", endTime - startTime, "ms");
    const memoryUsage = endMemory - startMemory;
    console.log(`Memory usage: ${memoryUsage} bytes`);
  };

  console.log(videoList);

  const transcodeToAVI = async () => {
    try {
      const file = inputRef.current?.files?.[0];
      if (!file) {
        alert("Please select a file first.");
        return;
      }
      const ffmpeg = ffmpegRef.current;
      await ffmpeg.writeFile(
        "input.mp4",
        new Uint8Array(await file.arrayBuffer())
      );

      await ffmpeg.exec(["-i", "input.mp4", "output.avi"]);

      //avi file
      const aviFile = await ffmpeg.readFile("output.avi");
      const aviURL = URL.createObjectURL(
        new Blob([aviFile.buffer], { type: "video/avi" })
      );
      console.log("avi URL:", aviURL);

      setBlobLink(aviURL);
      if (videoRef.current !== null) {
        videoRef.current.src = aviURL;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const transcodeToMp4 = async () => {
    try {
      const file = inputRef.current?.files?.[0];
      if (!file) {
        alert("Please select a file first.");
        return;
      }
      const ffmpeg = ffmpegRef.current;
      await ffmpeg.writeFile(
        "input.mp4",
        new Uint8Array(await file.arrayBuffer())
      );

      await ffmpeg.exec(["-i", "input.mp4", "output.mp4"]);

      //mp4 file
      const mp4File = await ffmpeg.readFile("output.mp4");
      const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
      const mp4URL = URL.createObjectURL(mp4Blob);
      console.log("mp4 URL:", mp4URL);

      setBlobLink(mp4URL);

      setVideoList((prev) => {
        return [
          ...prev,
          {
            index: prev.length,
            videoBlob: mp4URL,
          },
        ];
      });

      if (videoRef.current !== null) {
        videoRef.current.src = mp4URL;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [videoJsOptions, setVideoJsOptions] = useState({
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "/path/to/video.mp4",
        type: "video/mp4",
      },
    ],
  });

  useEffect(() => {
    setVideoJsOptions((prev) => {
      return {
        ...prev,
        sources: [
          {
            src: blobLink,
            type: "video/mp4",
          },
        ],
      };
    });
  }, [blobLink]);

  const playerRef = useRef(null);

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.autoplay(true);

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  // revoke the blob link when reaching 10 items
  useEffect(() => {
    if (videoList.length > 10) {
      URL.revokeObjectURL(videoList[0]?.videoBlob);
      setVideoList((prev) => {
        return prev.slice(1);
      });
    }
  }, [blobLink]);

  useEffect(() => {
    const clearIndexedDB = () => {
      const request = indexedDB.deleteDatabase("your-database-name");

      request.onsuccess = () => {
        console.log("IndexedDB successfully deleted.");
      };

      request.onerror = () => {
        console.log("Error deleting IndexedDB.");
      };

      request.onblocked = () => {
        console.log("IndexedDB deletion is blocked.");
      };
    };

    window.onbeforeunload = clearIndexedDB;

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  const [codec, setCodec] = useState("");

  console.log(codec)

  const detectCodec = async (file) => {
    const fileType = file.type;
    const vid = document.createElement('video');
    console.log(vid)
    console.log("can play", vid.canPlayType("video/mp4; codecs=hev1,mp4a.40.2" ));

    if (fileType === "video/mp4") {
      console.log("here")
      console.log(fileType)
      console.log(file)
      console.log("h254", file.canPlayType("video/mp4; codecs=avc1.42E01E,mp4a.40.2"));
      console.log("h265", file.canPlayType("video/mp4; codecs=hev1,mp4a.40.2"));

      // const arrayBuffer = await file.arrayBuffer();
      // const uint8Array = new Uint8Array(arrayBuffer);

      // // Check the first few bytes for specific patterns
      // const avc1 = uint8Array.includes("avc1".charCodeAt(0));
      // const hev1 =
      //   uint8Array.includes("hev1".charCodeAt(0)) ||
      //   uint8Array.includes("hvc1".charCodeAt(0));

      // if (avc1) {
      //   setCodec("H.264");
      // } else if (hev1) {
      //   setCodec("H.265");
      // } else {
      //   setCodec("Unknown or unsupported codec");
      // }
    } else {
      setCodec("Unsupported file type");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      detectCodec(file);
    }
  };

  return (
    <>
      <div>
        <input type="file" onChange={handleFileChange} />
        <p>Detected codec: {codec}</p>
      </div>

      <video ref={videoRef} controls></video>
      <br />
      <input type="file" ref={inputRef} />
      <button onClick={transcodeToFLV} disabled={!loaded}>
        Transcode to HLS
      </button>
      {/* {loadError && <p>{loadError}</p>} */}
      <p ref={messageRef}></p>
      <button onClick={load} disabled={loaded}>
        Load ffmpeg-core
      </button>

      <div>
        {blobLink && (
          <div>
            <VideoJS
              options={videoJsOptions}
              onReady={handlePlayerReady}
              // ref={videoRef}
            />
            <button
              onClick={() => {
                playerRef.current && playerRef.current.play();
              }}
            >
              play
            </button>
          </div>
        )}
      </div>
    </>
  );
}
