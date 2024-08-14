// Protocol type
const kProtoType_NONE = -99; //原型--none
const kProtoType_RTSP = 0; //原型--rtsp
const kProtoType_WS = 1; //原型--ws
const kProtoType_HTTP = 2;
const kProtoType_HTTP_M3U8 = 3; //原型--m3u8

// Stream type
const STREAM_TYPE_NONE = -1; //流类型--none
const STREAM_TYPE_HLS = 0; //流类型--hls
const STREAM_TYPE_FLV = 1; //流类型--flv
const STREAM_TYPE_NALU = 2; //流类型--Network Abstract Layer Unit

// //Player request.
// const kPlayVideoReq         = 0;
// const kPauseVideoReq        = 1;
// const kStopVideoReq         = 2;

// //Player response.
// const kPlayVideoRsp         = 0;
// const kAudioInfo            = 1;
// const kVideoInfo            = 2;
// const kAudioData            = 3;
// const kVideoData            = 4;

// player
const kReq_KFPT = 0;

//Downloader state
const kStateDownloading = 0; //开始下载（状态）
const kStatePause = 1; //暂停下载（状态）
const kStartStop = 2; //停止下载（状态）
const kStartResume = 3; //恢复下载（状态）
const kStartMore = 4; //更多下载（状态）
//Downloader request.
const kGetFileInfoReq = 0;
const kDownloadFileReq = 1;
const kReq_DownloadStart = 2; //case：下载--开始
const kReq_DownloadStop = 3; //case：下载--停止
const kReq_DownloadPause = 4; //case：下载--暂停
const kReq_DownloadResume = 5; //case：下载--恢复
const kReq_DownloadMore = 6; //case: 下载--更多
//Downloader response.
const kGetFileInfoRsp = 0;
const kFileData = 1;
const kUriData = 2; //t（类型）: uri数据
const kDownLoaderError = 3; //t（类型）: 下载错误
const kDownloadStartRsp = 4;
const kUriDataFinished = 5; //t（类型）：uri数据完成
const kUriDataError = 6; //t（类型）：uri数据错误
const kRsp_DownloadStart = 7; //case: /t(类型):开始下载
const kRsp_DownloadStop = 8; //case: /t(类型):停止下载
const kRsp_DownloadPause = 9; //case: /t(类型):暂停下载
const kRsp_DownloadResume = 10; //case: /t(类型):恢复下载
const kRsp_DurationChange = 11; //case: /t(类型):持续时间更改
const kRsp_ProfileData = 12;
const kUriDataCors = 13; //CORS 跨域
const kRsp_DownloadChangeTime = 14; //跳转时间
const kRsp_FileTimeLength = 15; //文件长度key
const kRsp_DownloadMore = 16; //case: /t(类型):更多下载

//Decoder request.
const kReq_DecoderStart = 0; //case: /t(类型):开始解码
const kReq_DecoderStop = 1; //case: /t(类型):停止解码
const kReq_DecoderPause = 2; //case: /t(类型):暂停解码
const kReq_DecoderResume = 3; //case: /t(类型):恢复解码
const kReq_DecoderSeekTo = 4; //case: /t(类型):解码定位
const kFeedData = 5; //case: /t(类型):解码提供数据
const kDataFinished = 6; //case: /t(类型):数据完成
const kReq_Profile = 7;
const kReq_Auth = 8;
const kReq_domain = 9;
const kReq_uuid = 10;
const kReq_DecoderRunning = 11; //case: /t(类型):解码运行
const kReq_DecoderSkipTime = 12; //case: /t(类型):跳帧（时间）

//Decoder response.
const kRsp_DecoderStart = 0; //t(类型):解码开始
const kRsp_DecoderStop = 1; //t(类型):解码停止
const kRsp_DecoderPause = 2; //t(类型):解码暂停
const kRsp_DecoderResume = 3; //t(类型):解码恢复
const kVideoFrame = 4; //case: video视频帧
const kAudioFrame = 5; //case: audio音频帧
const kVideoInfo = 6; //t(类型):video信息
const kAudioInfo = 7; //t(类型):audio信息
const kFinishedEvt = 8; //case:  /t(类型): 完成图片发送
const kRequestDataEvt = 9; //case:  /t(类型): 请求数据发送
const kRsp_DecoderSeekTo = 10; //case: /t(类型):解码定位
const kDecoderDataFull = 11; //解码数据满
const kDecoderDataMore = 12; //更多解码数据
const kWriteFrame = 13;
const kAuthErr = 14; //case: /t(类型):鉴权错误
const kVersion = 15; //case: /t(类型):版本信息
const kReauth = 16;
const kAiFrame = 17; //case: /t(类型):ai帧信息

//Loader
const EE_Loader_OK = 0; //loader完成
const EE_Err_Loader_Param = -1; //loader 参数错误
const EE_Err_Loader_Busy = -2; //loader 忙碌
const EE_Err_Loader_Timeout = -3; //loader 超时
const EE_Err_Loader_Net = -4; //loader 网络错误

const HLS_URL_TYPE_HLS = 0;
const HLS_URL_TYPE_TS = 1;
// const HLS_URL_TYPE_MAIN = 0;
// const HLS_URL_TYPE_SUBMAIN = 1;
// const HLS_URL_TYPE_TS = 2;

// callback Type
const CallBack_Error = 0; //回调key--错误
const CallBack_Loading = 1; //回调key--加载中
const CallBack_Stop = 2; //回调key--停止
const CallBack_Pause = 3; //回调key--暂停
const CallBack_Playing = 4; //回调key--播放中
const CallBack_Finished = 5; //回调key--完成
const CallBack_DurationChange = 6; //回调key--资源时长已改变
const CallBack_ProgressChange = 7; //回调key--进度条已改变
const CallBack_AiInfo = 8; //回调key-- AI信息
const CallBack_Cors = 9; //回调key--资源跨域

const CallBack_Note = [
  "Error",
  "Loading",
  "Stop",
  "Pause",
  "Playing",
  "Finished",
  "Duration Change",
  "Progress Change",
  "AI Info",
];
const Loading_Note = ["End", "Begin"];

const ProfileKey_Note = [
  "uuid",
  "appkey",
  "appsecret",
  "movedcard",
  "signature",
  "timeMillis",
];
const AuthKey_Note = "auth";
const AuthURL_Note =
  "https://pre-api.jftechws.com/aops/oppf-aops/userWebPlayer/auth";
const AuthRate_Default = 30000;
const AuthRate_Error = 5000;
const AuthRate_time = 5000;

// Error List
const Error_Common = 0;
const Error_Player_Loading = 1;
const Error_Player_MAX = 99;
const Error_Decoder_Init = 100;
const Error_Decoder_Open = 101;
const Error_Decoder_VideoInfo = 102;
const Error_Decoder_AudioInfo = 103;
const Error_Decoder_Auth = 104;
const Error_Decoder_Start = 105;
const Error_Decoder_Pause = 106;
const Error_Decoder_Resume = 107;
const Error_Decoder_Stop = 108;
const Error_Decoder_MAX = 199;
const Error_DownLoader_FileInfo = 200;
const Error_Url_CORS = 201;

const Error_Downloader_Start = 105;
const Error_Downloader_Stop = 108;
const Error_Downloader_Pause = 106;
const Error_Downloader_Resume = 107;
const Error_Downloader_More = 108;

// True && False
const TRUE_XM = 1;
const FALSE_XM = 0;

//Decoder states.
const decoderStateIdle = 0;
const decoderStateInitializing = 1;
const decoderStateReady = 2;
const decoderStateFinished = 3;

const emState_Idle = 0; //case： 播发器、解码初始 状态
// const emState_Initialized = 1;
const emState_Pausing = 2; //case： 播放器状态--暂停
const emState_Running = 3; //case: 播放器状态--运行
const emState_Finished = 4; //case：播放器状态--完成播放
const emState_Resume = 5; //case：播放器状态--恢复

//Player states.
const emPlayerState_Idle = 0; //播放器状态--初始
const emPlayerState_Playing = 1; //播放器状态--播放中
const emPlayerState_Pausing = 2; //播放器状态--暂停中

//Constant.
const downloadSpeedByteRateCoef = 2.0;

const g_nTimeoutCount_Max = 3; //默认最大超时计算次数
const g_nTimeout_Default = 10000; //默认超时（时长）
const g_nInterval_Default = 500; //默认间隔（时长）
const g_nIntervalDec_Default = 20; //默认解码间隔
const g_nBufferDuration_Default = 4000; //默认缓存持续时间
const g_nChunkSize_Default = 65536; //默认块大小
const g_nSpeed_Default = 1.0; //默认速率1.0
const g_nLogLv_Default = 0; //记录器等级--default

// Player Buffer
const g_nLeftShiftBits_Default = 2; // 左移2位 *4
const g_nRightShiftBits_Default = 8; // 右移8位 /256
const g_nMilliSecsOfBuff_Set = 2000; // 缓冲设置时间2秒
const g_nMilliSecsOfBuff_Min_Default = 50; // 最小缓冲时间0.05秒
const g_nMilliSecsOfBuff_Max_Default = 60000; // 最大缓冲时间60秒

const g_nLogLv_None = 0; //记录器等级--none
const g_nLogLv_Error = 10; //记录器等级--error
const g_nLogLv_Info = 20; //记录器等级--info
const g_nLogLv_Debug = 30; //记录器等级--debug
const g_nLogLv_All = 40; //记录器等级--all

const g_nDateStr_Default = "1970-01-01 00:00:00"; //默认日期

const g_szLicence = "";

const MAX_BUFFER_SIZE = 50 * 1024 * 1024; // 50MB，具体值根据实际需要调整

//（日志）记录器
function Logger(module) {
  this.module = module;
  this.level = g_nLogLv_All;
}
//设置等级
Logger.prototype.setLevel = function (lev) {
  if (lev > g_nLogLv_All) {
    this.level = g_nLogLv_All;
  } else if (lev < g_nLogLv_None) {
    this.level = g_nLogLv_None;
  }
};
//日志
Logger.prototype.log = function (line) {
  if (this.level < g_nLogLv_All) {
    return;
  }

  console.log("[" + this.currentTimeStr() + "][" + this.module + "]" + line);
};
//错误日志
Logger.prototype.logError = function (line) {
  if (this.level < g_nLogLv_Error) {
    return;
  }

  console.log(
    "[" + this.currentTimeStr() + "][" + this.module + "][ER] " + line
  );
};
//日志信息
Logger.prototype.logInfo = function (line) {
  if (this.level < g_nLogLv_Info) {
    return;
  }

  console.log(
    "[" + this.currentTimeStr() + "][" + this.module + "][IF] " + line
  );
};
//日志调试
Logger.prototype.logDebug = function (line) {
  if (this.level < g_nLogLv_Debug) {
    return;
  }

  console.log(
    "[" + this.currentTimeStr() + "][" + this.module + "][DT] " + line
  );
};
//当前时间
Logger.prototype.currentTimeStr = function () {
  let now = new Date(Date.now());
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  let hour = now.getHours();
  let min = now.getMinutes();
  let sec = now.getSeconds();
  let ms = now.getMilliseconds();
  return (
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hour +
    ":" +
    min +
    ":" +
    sec +
    ":" +
    ms
  );
};

export {
  kProtoType_NONE,
  kProtoType_RTSP,
  kProtoType_WS,
  kProtoType_HTTP,
  kProtoType_HTTP_M3U8,
  STREAM_TYPE_NONE,
  STREAM_TYPE_HLS,
  STREAM_TYPE_FLV,
  STREAM_TYPE_NALU,
  kReq_KFPT,
  kStateDownloading,
  kStatePause,
  kStartStop,
  kStartResume,
  kStartMore,
  kGetFileInfoReq,
  kDownloadFileReq,
  kReq_DownloadStart,
  kReq_DownloadStop,
  kReq_DownloadPause,
  kReq_DownloadResume,
  kReq_DownloadMore,
  kGetFileInfoRsp,
  kFileData,
  kUriData,
  kDownLoaderError,
  kDownloadStartRsp,
  kUriDataFinished,
  kUriDataError,
  kRsp_DownloadStart,
  kRsp_DownloadStop,
  kRsp_DownloadPause,
  kRsp_DownloadResume,
  kRsp_DurationChange,
  kRsp_ProfileData,
  kUriDataCors,
  kRsp_DownloadChangeTime,
  kRsp_FileTimeLength,
  kRsp_DownloadMore,
  kReq_DecoderStart,
  kReq_DecoderStop,
  kReq_DecoderPause,
  kReq_DecoderResume,
  kReq_DecoderSeekTo,
  kFeedData,
  kDataFinished,
  kReq_Profile,
  kReq_Auth,
  kReq_domain,
  kReq_uuid,
  kReq_DecoderRunning,
  kReq_DecoderSkipTime,
  kRsp_DecoderStart,
  kRsp_DecoderStop,
  kRsp_DecoderPause,
  kRsp_DecoderResume,
  kVideoFrame,
  kAudioFrame,
  kVideoInfo,
  kAudioInfo,
  kFinishedEvt,
  kRequestDataEvt,
  kRsp_DecoderSeekTo,
  kDecoderDataFull,
  kDecoderDataMore,
  kWriteFrame,
  kAuthErr,
  kVersion,
  kReauth,
  kAiFrame,
  EE_Loader_OK,
  EE_Err_Loader_Param,
  EE_Err_Loader_Busy,
  EE_Err_Loader_Timeout,
  EE_Err_Loader_Net,
  HLS_URL_TYPE_HLS,
  HLS_URL_TYPE_TS,
  CallBack_Error,
  CallBack_Loading,
  CallBack_Stop,
  CallBack_Pause,
  CallBack_Playing,
  CallBack_Finished,
  CallBack_DurationChange,
  CallBack_ProgressChange,
  CallBack_AiInfo,
  CallBack_Cors,
  CallBack_Note,
  Loading_Note,
  ProfileKey_Note,
  AuthKey_Note,
  AuthURL_Note,
  AuthRate_Default,
  AuthRate_Error,
  AuthRate_time,
  Error_Common,
  Error_Player_Loading,
  Error_Player_MAX,
  Error_Decoder_Init,
  Error_Decoder_Open,
  Error_Decoder_VideoInfo,
  Error_Decoder_AudioInfo,
  Error_Decoder_Auth,
  Error_Decoder_Start,
  Error_Decoder_Pause,
  Error_Decoder_Resume,
  Error_Decoder_Stop,
  Error_Decoder_MAX,
  Error_DownLoader_FileInfo,
  Error_Url_CORS,
  Error_Downloader_Start,
  Error_Downloader_Stop,
  Error_Downloader_Pause,
  Error_Downloader_Resume,
  Error_Downloader_More,
  TRUE_XM,
  FALSE_XM,
  decoderStateIdle,
  decoderStateInitializing,
  decoderStateReady,
  decoderStateFinished,
  emState_Idle,
  emState_Pausing,
  emState_Running,
  emState_Finished,
  emState_Resume,
  emPlayerState_Idle,
  emPlayerState_Playing,
  emPlayerState_Pausing,
  downloadSpeedByteRateCoef,
  g_nTimeoutCount_Max,
  g_nTimeout_Default,
  g_nInterval_Default,
  g_nIntervalDec_Default,
  g_nBufferDuration_Default,
  g_nChunkSize_Default,
  g_nSpeed_Default,
  g_nLogLv_Default,
  g_nLeftShiftBits_Default,
  g_nRightShiftBits_Default,
  g_nMilliSecsOfBuff_Set,
  g_nMilliSecsOfBuff_Min_Default,
  g_nMilliSecsOfBuff_Max_Default,
  g_nLogLv_None,
  g_nLogLv_Error,
  g_nLogLv_Info,
  g_nLogLv_Debug,
  g_nLogLv_All,
  g_nDateStr_Default,
  MAX_BUFFER_SIZE,
  Logger,
};
