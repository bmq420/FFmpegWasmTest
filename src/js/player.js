import {
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
} from "./common.js";
import { WebGLPlayer } from "./webgl.js";
import { PCMPlayer } from "./pcm-player.js";
import md5 from "./md5.js";
import ECB from "./DES.js";

const g_szVersion = "v1.0.0";
function Signature() {}

Signature.fnGetSignature = function (
  uuid,
  appkey,
  appsecret,
  timeMillis,
  movedcard
) {
  let encryptStr = uuid + appkey + appsecret + timeMillis;
  let arrEncrypt = Signature.fnStr2Byte(encryptStr);
  let arrEncrypt_change = Signature.fnChange(encryptStr, movedcard);
  let arrMerge = Signature.fnMerge(arrEncrypt, arrEncrypt_change);

  return md5.hex(arrMerge);
};

Signature.fnChange = function (encryptStr, movedcard) {
  let arrEncrypt = Signature.fnStr2Byte(encryptStr);
  let len = arrEncrypt.length;
  for (let idx = 0; idx < len; ++idx) {
    let tmp =
      idx % movedcard > (len - idx) % movedcard
        ? arrEncrypt[idx]
        : arrEncrypt[len - (idx + 1)];
    arrEncrypt[idx] = arrEncrypt[len - (idx + 1)];
    arrEncrypt[len - (idx + 1)] = tmp;
  }
  return arrEncrypt;
};

Signature.fnStr2Byte = function (str) {
  let bytes = new Array();
  let length = str.length;
  let char;

  for (let i = 0; i < length; i++) {
    char = str.charCodeAt(i);
    if (char >= 0x010000 && char <= 0x10ffff) {
      bytes.push(((char >> 18) & 0x07) | 0xf0);
      bytes.push(((char >> 12) & 0x3f) | 0x80);
      bytes.push(((char >> 6) & 0x3f) | 0x80);
      bytes.push((char & 0x3f) | 0x80);
    } else if (char >= 0x000800 && char <= 0x00ffff) {
      bytes.push(((char >> 12) & 0x0f) | 0xe0);
      bytes.push(((char >> 6) & 0x3f) | 0x80);
      bytes.push((char & 0x3f) | 0x80);
    } else if (char >= 0x000080 && char <= 0x0007ff) {
      bytes.push(((char >> 6) & 0x1f) | 0xc0);
      bytes.push((char & 0x3f) | 0x80);
    } else {
      bytes.push(char & 0xff);
    }
  }
  return bytes;
};

Signature.fnByte2Str = function (byte) {
  return byte
    .map(function (x) {
      x = x.toString(16);
      x = ("00" + x).substr(-2);
      return x;
    })
    .join("");
};

Signature.fnMerge = function (encryptByte, changeByte) {
  let length = encryptByte.length;
  let doubleLength = length * 2;
  let temp = new Array(doubleLength);

  for (let i = 0; i < length; i++) {
    temp[i] = encryptByte[i];
    temp[doubleLength - 1 - i] = changeByte[i];
  }

  return temp;
};

Signature.getDomainFromUrl = function () {
  let domain;
  let url = window.location.href;
  let index = url.indexOf("://");
  if (index != -1) {
    let domainUrl = url.substring(index + 3);
    index = domainUrl.indexOf("/");
    if (index != -1) {
      domain = domainUrl.substring(0, index);
    } else {
      domain = domainUrl;
    }
    index = domain.indexOf(":");
    if (index != -1) {
      domain = domain.substring(0, index);
    }
  }
  return domain;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ======================== String Operation =========================
//（首）字符串检查
String.prototype.startWith = function (str) {
  let reg = new RegExp("^" + str);
  return reg.test(this);
};
//（尾）字符串检查
String.prototype.endWith = function (str) {
  let reg = new RegExp(str + "$");
  return reg.test(this);
};

function IsEmptyStr(str) {
  if (str == undefined || str == null || str == "") {
    return true;
  }
  return false;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ======================== TimerCheck Operation =========================
//计事器检查对象
function TimerCheck(timeout) {
  let nTimeout = timeout || g_nTimeout_Default;
  this.fnSetTimeout_TimerChk(nTimeout);
}
//更新计时器（new Date）
TimerCheck.prototype.fnUpdate_TimerChk = function () {
  this._tTimeoutNext = Date.now() + this._tTimeout;
};
//设置计时器
TimerCheck.prototype.fnSetTimeout_TimerChk = function (timeout) {
  this._tTimeout = timeout;
  this.fnUpdate_TimerChk();
};
//检查超时计时器
TimerCheck.prototype.fnCheckTimeout_TimerChk = function (tnow) {
  return this._tTimeoutNext > tnow;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ======================== FileInfo Operation =========================
//文件(url)对象（属性）
function FileInfo(urlInfo) {
  this.url = urlInfo.url; //播放器地址
  this.chunkSize = urlInfo.checkSize || g_nChunkSize_Default;
  this.isStream = urlInfo.isStream === undefined ? true : urlInfo.isStream; //直播、回放
  this.waitHeaderLen = urlInfo.waitHeaderLen;
  this.bufferDuration = urlInfo.bufferDuration || g_nBufferDuration_Default;
  this.timeoutRecv = urlInfo.timeoutRecv || g_nTimeout_Default;
  this.timeoutDec = urlInfo.timeoutDec || g_nTimeout_Default;
  this.intervalDec = urlInfo.intervalDec || g_nIntervalDec_Default;
  this.intervalTrack = urlInfo.intervalTrack || g_nInterval_Default;
  this.speed = urlInfo.speed || g_nSpeed_Default; //播放速率
  this.logLv = urlInfo.logLv || g_nLogLv_Default;
  this.proto = urlInfo.proto;
  this.type = urlInfo.type; //播放协议hls 、flv
  this.urlProto = urlInfo.urlProto;
  this.leftShiftBits = urlInfo.leftShiftBits || g_nLeftShiftBits_Default;
  this.rightShiftBits = urlInfo.rightShiftBits || g_nRightShiftBits_Default;
  this.milliSecsOfBuff = urlInfo.milliSecsOfBuff || g_nMilliSecsOfBuff_Set;
  this.playTime = Math.ceil(Date.now() / 1000);
  this.authCode = null;
  this.startDate = urlInfo.startDate || g_nDateStr_Default;
  this.endDate = urlInfo.endDate || g_nDateStr_Default;

  let proto_type = urlInfo.urlProto;
  let infoRet = {
    proto: kProtoType_NONE,
    type: STREAM_TYPE_NONE,
  };
  if (proto_type == "httpFlv") {
    infoRet.proto = kProtoType_HTTP;
    infoRet.type = STREAM_TYPE_FLV;
  } else if (proto_type == "httpHls") {
    infoRet.proto = kProtoType_HTTP_M3U8;
    infoRet.type = STREAM_TYPE_HLS;
  } else if (proto_type == "ws") {
    infoRet.proto = kProtoType_WS;
    infoRet.type = STREAM_TYPE_NALU;
  } else if (proto_type == "http") {
    infoRet.proto = kProtoType_HTTP;
    infoRet.type = STREAM_TYPE_NALU;
  } else {
    infoRet = this.fnGetStreamTypeByUrl(this.url);
  }

  if (this.proto == undefined) {
    this.proto = infoRet.proto;
  }

  if (this.type == undefined) {
    this.type = infoRet.type;
  }
}

//计算时间差，返回单位：毫秒
function calculateTimeDifference(timeStr1, timeStr2) {
  // 定义日期时间字符串的格式
  const format = "YYYY-MM-DD HH:mm:ss";

  // 解析字符串为 Date 对象
  function parseDateTime(timeStr) {
    const parts = timeStr.split(/[- :]/);
    return new Date(
      Date.UTC(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5])
    );
  }

  // 计算时间差
  const dateTime1 = parseDateTime(timeStr1);
  const dateTime2 = parseDateTime(timeStr2);
  const difference = dateTime1 - dateTime2;

  return difference;
}
//获取流类型，根据url区分
FileInfo.prototype.fnGetStreamTypeByUrl = function (url) {
  let pattHttp = /^http/;
  let pattRtsp = /^rtsp/;
  let pattWs = /^ws{1,2}:/;

  if (pattRtsp.test(url)) {
    let infoRet = {
      p: kProtoType_RTSP,
      t: STREAM_TYPE_NALU,
    };
    return infoRet;
  } else if (pattWs.test(url)) {
    let infoRet = {
      p: kProtoType_WS,
      t: STREAM_TYPE_NALU,
    };
    return infoRet;
  } else if (pattHttp.test(url)) {
    let pattM3u8 = /.m3u8$/;
    let pattFlv = /.flv$/;
    if (pattFlv.test(url)) {
      let infoRet = {
        p: kProtoType_HTTP,
        t: STREAM_TYPE_FLV,
      };
      return infoRet;
    } else if (pattM3u8.test(url)) {
      let infoRet = {
        p: kProtoType_HTTP_M3U8,
        t: STREAM_TYPE_HLS,
      };
      return infoRet;
    } else {
      let infoRet = {
        p: kProtoType_NONE,
        t: STREAM_TYPE_NONE,
      };
      return infoRet;
    }
  } else {
    let infoRet = {
      p: kProtoType_NONE,
      t: STREAM_TYPE_NONE,
    };
    return infoRet;
  }
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ======================== FunExtend Stream Operation =========================
//函数扩展流
function FunsExtend_Stream() {}
//（扩展流，直播）原型
FunsExtend_Stream.prototype = {
  //暂停
  fnPause: function () {
    this.m_stStreamParams = {
      urlInfo: this.m_pUrlInfo,
      canvas: this.m_pCanvas,
      callback: this.m_fnCallback,
      node: this.m_pNodeFullscreen,
    };

    this.logger.logInfo("Stop in stream pause.");
    // this.fnStop();

    //Pause audio context.
    if (this.m_pPcmPlayer) {
      this.m_pPcmPlayer.pause();
    }
    this.m_nState = emState_Pausing;

    this.fnPauseDownloader();
    this.fnPauseDecoder();
    this.fnStopTimerTrack();
    this.fnStopBuffering();
    this.fnClearBufferFrames();

    let ret = {
      e: 0,
      m: "Success",
    };
    this.fnCallbackMessage(CallBack_Pause);
    return ret;
  },
  //恢复
  fnResume: function (fromseek) {
    //Resume audio context.
    if (this.m_pPcmPlayer) {
      this.m_pPcmPlayer.resume();
    }

    this.m_nState = emState_Running;

    this.fnStop();

    this.logger.logInfo("Play in stream resume.");
    this.fnPlay(
      this.m_stStreamParams.urlInfo,
      this.m_stStreamParams.canvas,
      this.m_stStreamParams.callback
    );
    this.m_stStreamParams = null;

    let ret = {
      e: 0,
      m: "Success",
    };

    this.fnCallbackMessage(CallBack_Playing);
    return ret;
  },
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ======================== FunExtend NotStream Operation =========================
//非函数扩展流
function FunExtend_NotStream() {}
//（非扩展流，回放）原型
FunExtend_NotStream.prototype = {
  //暂停
  fnPause: function () {
    this.m_stStreamParams = {
      urlInfo: this.m_pUrlInfo,
      canvas: this.m_pCanvas,
      callback: this.m_fnCallback,
      node: this.m_pNodeFullscreen,
    };

    //Pause audio context.
    if (this.m_pPcmPlayer) {
      this.m_pPcmPlayer.pause();
    }
    this.m_tLocalMsecsFirst = 0;
    this.m_nState = emState_Pausing;

    this.fnPauseDownloader();
    this.fnPauseDecoder();
    this.fnPauseTimerTrack();
    this.fnStopBuffering();
    let proto = this.m_pUrlInfo.proto;
    if (kProtoType_HTTP_M3U8 == proto) {
      this.fnClearBufferFrames();
    } else {
      if (this.m_arrBufferFrames.length > 0) {
        let frame = this.m_arrBufferFrames[0];
        this.m_nPause_PauseTime = Math.floor(frame.s / 1000);
      }
    }

    let ret = {
      e: 0,
      m: "Success",
    };

    this.fnCallbackMessage(CallBack_Pause);
    return ret;
  },
  //恢复
  fnResume: function (fromseek) {
    this.logger.logInfo("Resume.");

    //Resume audio context.
    if (this.m_pPcmPlayer) {
      this.m_pPcmPlayer.resume();
    }
    this.m_tLocalMsecsFirst = 0;
    this.m_nState = emState_Running;

    let proto = this.m_pUrlInfo.proto;
    if (kProtoType_HTTP_M3U8 == proto) {
      this.fnResumeDownloader();
      this.fnResumeDecoder();
      this.fnStartBuffering();
      ++this.m_nSeq;

      this.m_bBuffering = false;
      this.m_nState_Dld = emState_Idle;
      this.m_nState_Dec = emState_Idle;
      this.fnStartDownloader();
      this.fnStartDecoder();
      this.fnStartBuffering();
    } else {
      this.fnHideLoading();
      this.fnPlayerSkipTime(this.m_nPause_PauseTime);
    }

    this.logger.logInfo("Play in stream resume.");

    this.fnStartTimerTrack();
    this.fnDisplayLoop();
    this.m_stStreamParams = null;

    let ret = {
      e: 0,
      m: "Success",
    };
    this.fnCallbackMessage(CallBack_Playing);
    return ret;
  },
};
//播放器对象
function Player(options) {
  this.fnClearAuthStroeSession();
  this.nReqAuthCount = 0;
  this.nextRequestAuth = 0;
  this.nextRequestProfile = 0;

  this.m_szVersion = "";
  this.options = options;
  // this == Player
  // buffer time
  this.m_nSeq = 0; //序号
  this.m_bRegisterEvent = false; //注册事件
  this.m_pTimerCheck_Recv = null; //计时器检查 接收（更新下一个超时）
  this.m_pTimerCheck_DecFrame = null; //计时器检查 解码帧（更新下一个超时）

  // 针对实时播放和回放相关方法的特殊处理
  this.m_pFunsExtend = null; //扩展函数

  // local millisecs
  this.m_tLocalMsecsFirst = 0; //本地毫秒计数（first）
  this.m_tLocalMsecsLast = 0; //本地毫秒计数（last）
  // pts of frame
  this.m_tPtsFirst = 0; //播放的信息时刻（first）（单位秒）
  this.m_tPtsLast = 0; //播放的信息时刻（last）（单位秒）

  // 外部传入参数
  this.m_pUrlInfo = null; // 链接相关信息
  this.m_pCanvas = null; // 画布
  this.m_fnCallback = null; //回调（普通）函数
  this.m_pCallback_AiInfo = null; //回调（AI）函数
  this.m_pNodeFullscreen = null; //全屏元素节点

  this.m_pPcmPlayer = null; // audio
  this.m_pWebGLPlayer = null; // video

  // 画面信息
  this.m_nDuration = 0; //期间（持续时间）
  this.m_nPixFmt = 0; //像素
  this.m_nWidth = 0; //宽度
  this.m_nHeight = 0; //高度
  this.m_nYLen = 0; //宽 * 高
  this.m_nUVLen = 0; //(宽/2) * (高/2)

  // 音频信息
  this.m_bHasAudio = false; //是否有音频
  this.m_szEncodingPcm = 0; //编码类型。例如：16bitInt
  this.m_nChannelsPcm = 0; //音频通道编号
  this.m_nSampleRatePcm = 0; //音频采样率
  this.m_bGetFirstFrame = false; //获取第一帧信息状态
  this.m_nBeginTime_Pcm = 0; //音频开始时间

  this.m_nState = emState_Idle; //（视频）播放状态
  this.m_nState_Dld = null; //下载状态
  this.m_nState_Dec = emState_Idle; //解码状态
  this.m_nTimerInterval_Dec = g_nIntervalDec_Default; //解码计时器间隔

  this.m_pTimeLabel = null; //时间标签（进度条文本）
  this.m_pTimeTrack = null; //时间轨迹（对象，包含input 的value、max）
  this.m_pTimer_Track = null; //计时器轨迹对象（记录setInterval对象）
  this.m_szDurationDisplay = "00:00:00"; //轨迹持续时间显示（文案）
  this.m_nTimerInterval_Track = g_nInterval_Default; //轨迹计时器间隔（周期）

  this.m_pLoadingDiv = null; // 缓冲时圈动画（元素对象）

  // 未发送至Decoder的数据
  this.m_arrCache = new Array(); //缓存数组（UriData）

  //进度条模块
  this.m_pProgressBarModal = null; //进度条模块（用于显示、隐藏）
  this.m_fDurationSecs = 0; //记录回放url （m3u8）文件总时长

  // 帧缓冲
  this.m_bBuffering = false; //帧缓冲状态
  this.arrBufferFrames = []; //缓冲帧数组信息
  this.arrBufferPcms = []; //缓冲音频数组信息
  // buffer control
  this.m_nLeftShiftBits = g_nLeftShiftBits_Default; // 左移位数
  this.m_nRightShiftBits = g_nRightShiftBits_Default; // 右移位数
  this.m_tMilliSecsOfBuff_Set = g_nMilliSecsOfBuff_Set; // 缓冲设置时间
  this.m_tDuration = 0; // 单切片最大时间
  this.m_bIsRealTime = true; // 是否增强实时性
  this.m_tMilliSecsOfBuff_2X = g_nMilliSecsOfBuff_Set + 500; // 实时播放时最大延时累积时间
  this.m_tMilliSecsOfBuff_Min = Math.max(
    g_nMilliSecsOfBuff_Set >> this.m_nRightShiftBits,
    g_nMilliSecsOfBuff_Min_Default
  ); // 最小缓冲时间
  this.m_tMilliSecsOfBuff_Max = Math.min(
    g_nMilliSecsOfBuff_Set << this.m_nLeftShiftBits,
    g_nMilliSecsOfBuff_Max_Default
  ); // 最大缓冲时间

  // 实时流时存放url相关信息
  this.m_stStreamParams = null;
  this.m_arrBufferFrames = []; //缓冲帧数组信息
  this.m_pWorker_Dld = null; //创建的worker downloader.js 对象
  this.m_pWorker_Dec = null; //创建的worker decoder.js 对象
  this.m_nSpeed = 1; //播放速率
  this.m_nState_SkipPlayer = false; //跳转播放状态（统计文件总时长业务区分）
  this.m_time_SkipPlayer = 0; //跳转时间点
  this.m_nFlag_SkipOpt = false; //操作跳转标识
  this.m_nPause_PauseTime = 0; //暂停frame时间记录点

  this.logger = new Logger("Player");
  this.fnNewWorkerDownloader(); //worker  new downloader.js
  this.fnNewWorkerDecoder(); //worker new decoder.js

  this.m_bSendProfile = false;
  this.m_bSendAuth = true;
}

Player.prototype.fnClearAuthStroeSession = function () {
  for (let i = 0; i < ProfileKey_Note.length; i++) {
    let key = ProfileKey_Note[i];
    window.sessionStorage.removeItem(key);
  }
};

Player.prototype.fnParseProfile = function (data) {
  let uuid = data["uuid"];
  let appkey = data["appkey"];
  let appsecret = data["appsecret"];
  let movedcard = data["movedcard"];
  if (uuid && appkey && appsecret && movedcard) {
    window.sessionStorage.setItem(ProfileKey_Note[0], uuid);
    window.sessionStorage.setItem(ProfileKey_Note[1], appkey);
    window.sessionStorage.setItem(ProfileKey_Note[2], appsecret);
    window.sessionStorage.setItem(ProfileKey_Note[3], movedcard.toString());
    return 0;
  }

  return -1;
};

Player.prototype.fnGetProfile = function () {
  let uuid = window.sessionStorage.getItem(ProfileKey_Note[0]);
  if (uuid) {
    this.AuthErrorByStop();
    console.error("The authentication information is incorrect, please check");
    return;
  }

  if (this.nextRequestProfile > Date.now()) {
    return;
  }

  let _this = this;
  fetch("./profile.ini")
    .then((response) => {
      response
        .json()
        .then((data) => {
          let uuid = data["uuid"];
          let appkey = data["appkey"];
          let appsecret = data["appsecret"];
          let movedcard = data["movedcard"];
          if (uuid && appkey && appsecret && movedcard) {
            window.sessionStorage.setItem(ProfileKey_Note[0], uuid);
            window.sessionStorage.setItem(ProfileKey_Note[1], appkey);
            window.sessionStorage.setItem(ProfileKey_Note[2], appsecret);
            window.sessionStorage.setItem(
              ProfileKey_Note[3],
              movedcard.toString()
            );
            _this.fnRequestAuth();
          }
        })
        .catch((error) => {
          console.log("ERROR:", error);
          ++_this.nReqAuthCount;
        });
    })
    .catch((error) => {
      console.log("ERROR:", error);
      ++_this.nReqAuthCount;
    });

  // 确定下次请求时间
  this.nextRequestProfile = Date.now() + 1000 * 5;
};

Player.prototype.fnRequestAuth = function () {
  let _this = this;
  let uuid = window.sessionStorage.getItem(ProfileKey_Note[0]);
  let appkey = window.sessionStorage.getItem(ProfileKey_Note[1]);
  let appsecret = window.sessionStorage.getItem(ProfileKey_Note[2]);
  let movedcardStr = window.sessionStorage.getItem(ProfileKey_Note[3]);
  if (!uuid || !appkey || !appsecret || !movedcardStr) {
    this.AuthErrorByStop();
    console.error("The authentication information is incorrect, please check");
    return;
  }

  if (this.nextRequestAuth > Date.now()) {
    return;
  }
  this.nextRequestAuth = Date.now() + AuthRate_Error;

  let movedcard = parseInt(movedcardStr);
  let timeMillis = new Date().getTime().toString().padStart(20, "0");

  let signature = Signature.fnGetSignature(
    uuid,
    appkey,
    appsecret,
    timeMillis,
    movedcard
  );

  let domain = Signature.getDomainFromUrl();
  let code = {
    Host: domain,
    StartTime: this.m_pUrlInfo.playTime,
  };

  let encrypted = ECB.encrypt(JSON.stringify(code), timeMillis, uuid);

  let url = AuthURL_Note;

  let hdr = new Headers();
  hdr.append("Content-Type", "application/x-www-form-urlencoded");
  hdr.append("uuid", uuid);
  hdr.append("appKey", appkey);
  hdr.append("timeMillis", timeMillis);
  hdr.append("signature", signature);

  let reqInit = {
    method: "POST",
    headers: hdr,
    mode: "cors",
    cache: "default",
    body: encrypted,
  };
  fetch(url, reqInit)
    .then((response) => {
      response
        .json()
        .then((data) => {
          let code = data["code"];
          let msg = data["msg"];
          let dt = data["data"];
          if (code == 2000 || code == 15074) {
            this.nextRequestAuth = Date.now() + AuthRate_Default;
            _this.nReqAuthCount = 0;
            let flushTime = Math.ceil(Date.now() / 1000);
            if (!this.m_pUrlInfo.authCode) {
              this.m_pUrlInfo.playTime = flushTime;
              window.sessionStorage.setItem(AuthKey_Note, dt);
            } else {
              if (this.m_pUrlInfo.authCode != code) {
                this.m_pUrlInfo.playTime = flushTime;
              } else {
                //二次确认再存储
                window.sessionStorage.setItem(AuthKey_Note, dt);
              }
            }
          } else {
            this.fnStop();
            console.error(msg);
          }

          this.m_pUrlInfo.authCode = code;
        })
        .catch((error) => {
          console.log("ERROR:", error);
          this.AuthError();
        });
    })
    .catch((error) => {
      console.log("ERROR:", error);
      this.AuthError();
    });
};

Player.prototype.AuthErrorByStop = function () {
  ++this.nReqAuthCount;
};

Player.prototype.AuthError = function () {
  ++this.nReqAuthCount;
};

//获取版本
Player.prototype.fnGetVersion = function () {
  return g_szVersion;
};
//设置（回调）ai信息
Player.prototype.fnSetCbAiInfo = function (cbAi) {
  this.m_pCallback_AiInfo = cbAi;
};
//获取wasm版本
Player.prototype.fnGetWasmVersion = function () {
  return this.m_szVersion;
};
//真实时间
Player.prototype.fnSetRealTime = function (isRealTime) {
  this.m_bIsRealTime = isRealTime;
};

//播放
Player.prototype.fnPlay = function (urlInfo, canvas, callback, nodeFullscreen) {
  urlInfo.url = removeQueryParam(urlInfo.url, "seekFromBegin");
  this.logger.logInfo("Play " + urlInfo.url + ".");
  let ret = {
    e: 0,
    m: "Success",
  };

  this.nReqAuthCount = 0;
  this.fnParseProfile(this.options);
  this.fnServerUUID();
  this.fnNetDomain();

  do {
    if (this.m_nState == emState_Pausing) {
      ret = this.fnResume();
      break;
    }

    if (this.m_nState == emState_Running) {
      break;
    }

    if (!urlInfo) {
      ret = {
        e: -1,
        m: "Invalid url",
      };
      success = false;
      this.logger.logError("[ER] playVideo error, url empty.");
      break;
    }

    if (!canvas) {
      ret = {
        e: -2,
        m: "Canvas not set",
      };
      success = false;
      this.logger.logError("[ER] playVideo error, canvas empty.");
      break;
    }

    this.m_pUrlInfo = new FileInfo(urlInfo);
    if (this.m_pUrlInfo.isStream) {
      this.m_pFunsExtend = new FunsExtend_Stream();
    } else {
      this.m_pFunsExtend = new FunExtend_NotStream();
    }

    // download数据计时器
    this.m_pTimerCheck_Recv = new TimerCheck(this.m_pUrlInfo.timeoutRecv);
    // decoder数据计时器
    this.m_pTimerCheck_DecFrame = new TimerCheck(this.m_pUrlInfo.timeoutDec);
    this.m_pCanvas = canvas;
    this.m_fnCallback = callback;
    this.m_pNodeFullscreen = nodeFullscreen;

    this.m_nTimerInterval_Track = this.m_pUrlInfo.intervalTrack;
    this.m_nTimerInterval_Dec = this.m_pUrlInfo.intervalDec;
    this.fnInitTimerTrack();
    this.fnStartTimerTrack();

    this.m_nSpeed = this.m_pUrlInfo.speed;
    this.fnSetMilliSecsOfBuff(
      this.m_pUrlInfo.milliSecsOfBuff,
      this.m_pUrlInfo.leftShiftBits,
      this.m_pUrlInfo.rightShiftBits
    );
    this.fnClearBufferFrames();

    //let playCanvasContext = playCanvas.getContext("2d"); //If get 2d, webgl will be disabled.
    this.m_pWebGLPlayer = new WebGLPlayer(
      this.m_pCanvas,
      {
        preserveDrawingBuffer: false, //预服务绘图缓冲区
      },
      this.m_pNodeFullscreen
    );

    // if (!this.m_bRegisterEvent) {
    // 	let player = this;
    // 	this.fnRegisterVisibilityEvent(function(visible) {
    // 		if (visible) {
    // 			player.fnResume();
    // 		} else {
    // 			player.fnPause();
    // 		}
    // 	});
    // 	this.m_bRegisterEvent = true;
    // }

    this.m_bBuffering = false;
    this.m_nState_Dld = emState_Idle;
    this.m_nState_Dec = emState_Idle;
    this.fnStartDownloader();
    this.fnStartDecoder();
    this.fnStartBuffering();

    ++this.m_nSeq;
    this.m_nState = emState_Running;
    this.fnDisplayLoop();
    this.fnCallbackMessage(CallBack_Playing);
  } while (false);

  return ret;
};
//暂停
Player.prototype.fnPause = function () {
  this.logger.logInfo("Pause.");
  if (this.m_nState != emState_Running) {
    let ret = {
      e: -1,
      m: "Not playing",
    };
    return ret;
  }

  return this.m_pFunsExtend.fnPause.call(this);
};
//恢复播放
Player.prototype.fnResume = function (fromSeek) {
  this.logger.logInfo("Resume.");

  if (this.m_nState != emState_Pausing) {
    let ret = {
      e: -1,
      m: "Not pausing",
    };
    return ret;
  }

  return this.m_pFunsExtend.fnResume.call(this, fromSeek);
};
//停止
Player.prototype.fnStop = function () {
  if (this.m_nState == emPlayerState_Idle) {
    let ret = {
      e: -1,
      m: "Not playing",
    };
    return ret;
  }
  this.m_nState = emState_Idle;
  this.m_nState_SkipPlayer = false;
  this.m_time_SkipPlayer = 0;

  this.fnStopBuffering();
  this.fnStopDownloader();
  this.fnStopDecoder();
  this.fnStopTimerTrack();
  this.fnHideLoading();
  this.fnClearBufferFrames();
  this.fnCallbackMessage(CallBack_Stop);
  this.fnClear();
  this.fnStopTimerAuth();

  if (this.m_pTimerCheck_Recv) {
    this.m_pTimerCheck_Recv = null;
  }

  if (this.m_pTimerCheck_DecFrame) {
    this.m_pTimerCheck_DecFrame = null;
  }

  if (this.m_pWebGLPlayer) {
    this.m_pWebGLPlayer.destroy(); // 假设有 destroy 方法
    this.m_pWebGLPlayer = null;
  }

  this.m_tLocalMsecsFirst = 0;
  this.m_tLocalMsecsLast = 0;
  this.m_tPtsFirst = 0;
  this.m_tPtsLast = 0;

  this.m_pUrlInfo = null;
  this.m_pCanvas = null;
  this.m_pCallback = null;
  this.m_nLenRecv = 0;
  this.m_pNodeFullscreen = null;
  this.arrBufferPcms = [];
  this.m_arrBufferFrames = [];
  this.m_arrCache = new Array();
  this.m_pProgressBarModal = null;
  this.m_fDurationSecs = 0;
  this.m_bBuffering = false;
  this.arrBufferFrames = [];
  this.arrBufferPcms = [];
  this.m_nPause_PauseTime = 0;
  this.m_bGetFirstFrame = false;

  if (this.m_pPcmPlayer) {
    this.m_pPcmPlayer.destroy();
    this.m_pPcmPlayer = null;
    this.logger.logInfo("Pcm player released.");
  }

  this.fnInitTimerTrack();
  if (this.m_pTimeLabel) {
    //回放显示逻辑
    this.m_pTimeLabel.innerHTML =
      this.fnFormatTime(0) + "/" + this.fnFormatTime(0);
  }

  this.logger.logInfo("Closing decoder.");
  return {
    e: -1,
    m: "Stop play",
  };
};
//销毁worker
Player.prototype.fnDestroy = function () {
  this.m_pWorker_Dld && this.m_pWorker_Dld.terminate();
  this.m_pWorker_Dec && this.m_pWorker_Dec.terminate();
  this.m_pWorker_Dld = null;
  this.m_pWorker_Dec = null;
};
//清除
Player.prototype.fnClear = function () {
  if (this.m_pWebGLPlayer) {
    this.m_pWebGLPlayer.clear();
  }
};
//全屏
Player.prototype.fnFullscreen = function () {
  if (this.m_pWebGLPlayer) {
    this.m_pWebGLPlayer.fullscreen();
  }
};
//退出全屏
Player.prototype.fnExitFullscreen = function () {
  if (this.m_pWebGLPlayer) {
    this.m_pWebGLPlayer.exitFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else {
      alert("Exit fullscreen doesn't work");
    }
  }
};
//获取状态
Player.prototype.fnGetState = function () {
  return this.m_nState;
};
//设置播放速率
Player.prototype.fnSetSpeed = function (speed) {
  if (speed < 0.125 || speed > 4.0) {
    return false;
  }

  if (this.m_nSpeed == speed) {
    return true;
  }

  if (this.m_pUrlInfo) {
    this.m_pUrlInfo.speed = speed;
  }
  this.m_nSpeed = speed;
  this.m_tLocalMsecsFirst = 0;

  return true;
};
//设置毫秒缓冲区（buff）
Player.prototype.fnSetMilliSecsOfBuff = function (
  milliSecs,
  leftShiftBits,
  rightShiftBits
) {
  this.m_nLeftShiftBits = leftShiftBits || this.m_nLeftShiftBits;
  this.m_nRightShiftBits = rightShiftBits || this.m_nRightShiftBits;
  this.m_tMilliSecsOfBuff_Set = milliSecs || g_nMilliSecsOfBuff_Set;
  this.m_tMilliSecsOfBuff_2X = this.m_tMilliSecsOfBuff_Set + 500;
  this.m_tMilliSecsOfBuff_Min = Math.max(
    this.m_tMilliSecsOfBuff_Set >> this.m_nRightShiftBits,
    g_nMilliSecsOfBuff_Min_Default
  );
  this.m_tMilliSecsOfBuff_Max = Math.min(
    this.m_tMilliSecsOfBuff_Set << this.m_nLeftShiftBits,
    g_nMilliSecsOfBuff_Max_Default
  );
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ======================== Audio About =========================
//音频信息
Player.prototype.fnOnAudioInfo = function (objData) {
  if (this.m_nState != emState_Running) {
    return;
  }
  this.logger.logInfo("OnAudioInfo " + objData.e + ".");
  if (objData.e == 0) {
    this.fnOnAudioParam(objData.a);
    this.logger.logInfo("OnAudioInfo.");
  } else {
    this.fnReportErrorPlayer(Error_Decoder_AudioInfo);
  }
};
//音频参数（创建音频对象）
Player.prototype.fnOnAudioParam = function (a) {
  if (this.m_nState != emState_Running) {
    return;
  }

  this.logger.logInfo(
    "Audio param sampleFmt:" +
      a.f +
      " channels:" +
      a.c +
      " sampleRate:" +
      a.r +
      "."
  );

  let nHasAudio = a.s;
  this.m_bHasAudio = nHasAudio > 0;
  if (!this.m_bHasAudio) {
    return;
  }

  let nSampleFmt = a.f;
  let nChannels = a.c;
  let nSampleRate = a.r;

  let szEncoding = "16bitInt";
  switch (nSampleFmt) {
    case 0:
      szEncoding = "8bitInt";
      break;
    case 1:
      szEncoding = "16bitInt";
      break;
    case 2:
      szEncoding = "32bitInt";
      break;
    case 3:
      szEncoding = "32bitFloat";
      break;
    case 4:
      szEncoding = "64bitFloat";
      break;
    case 5:
      szEncoding = "8bitInt";
      break;
    case 6:
      szEncoding = "16bitInt";
      break;
    case 7:
      szEncoding = "32bitInt";
      break;
    case 8:
      szEncoding = "32bitFloat";
      break;
    case 9:
      szEncoding = "64bitFloat";
      break;
    case 10:
    case 11:
      szEncoding = "64bitInt";
      break;
    default:
      this.logger.logError("Unsupported audio sampleFmt " + nSampleFmt + "!");
  }
  this.logger.logInfo("Audio encoding " + szEncoding + ".");

  this.m_pPcmPlayer = new PCMPlayer({
    encoding: szEncoding,
    channels: nChannels,
    sampleRate: nSampleRate,
    flushingTime: 5000,
  });

  this.m_szEncodingPcm = szEncoding;
  this.m_nChannelsPcm = nChannels;
  this.m_nSampleRatePcm = nSampleRate;
};
//重启控制模块
Player.prototype.fnRestartPcm = function () {
  if (this.m_pPcmPlayer) {
    this.m_pPcmPlayer.destroy();
    this.m_pPcmPlayer = null;
  }

  this.m_pPcmPlayer = new PCMPlayer({
    encoding: this.m_szEncodingPcm,
    channels: this.m_nChannelsPcm,
    sampleRate: this.m_nSampleRatePcm,
    flushingTime: 5000,
  });
};
//显示音频（帧）
Player.prototype.fnDisplayAudioFrame = function (frame) {
  if (this.m_nState != emState_Running) {
    return false;
  }

  // if (!this.m_bGetFirstFrame) {
  // 	this.m_bGetFirstFrame = true;
  // 	this.m_nBeginTime_Pcm = frame.s;
  // }
  this.m_pPcmPlayer?.play(new Uint8Array(frame.d), this.m_nSpeed);
  return true;
};
//设置音频（帧）
Player.prototype.fnOnAudioFrame = function (frame) {
  let player = this;
  if (this.m_nState != emState_Running) {
    return;
  }

  this.arrBufferPcms.push(frame);
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ======================== Video About =========================
//视频对象
Player.prototype.fnOnVideoInfo = function (objData) {
  if (objData.e == 0) {
    this.fnOnVideoParam(objData.v);
  } else {
    this.fnReportErrorPlayer(Error_Decoder_VideoInfo);
  }
};
//视频对象属性
Player.prototype.fnOnVideoParam = function (v) {
  if (this.m_nState == emState_Idle) {
    return;
  }

  this.m_nDuration = v.d;
  this.m_nPixFmt = v.p;
  this.m_nWidth = v.w;
  this.m_nHeight = v.h;
  this.m_nYLen = this.m_nWidth * this.m_nHeight;
  this.m_nUVLen = (this.m_nWidth / 2) * (this.m_nHeight / 2);

  // TimeTrack info
  this.fnUpdateTimerTrackMax(this.m_nDuration);
};
//视频帧
Player.prototype.fnOnVideoFrame = function (frame) {
  this.fnPushBufferFrame(frame);
};
//显示视频帧
Player.prototype.fnDisplayVideoFrame = function (frame) {
  //this.logger.logInfo("displayVideoFrame begin");
  if (this.m_nState != emState_Running) {
    return false;
  }

  let nTimestampAudio = -1;
  let nDelay = -1;
  // if (this.m_pPcmPlayer) {
  // 	if (!this.m_bGetFirstFrame) {
  // 		this.m_bGetFirstFrame = true;
  // 		this.m_nBeginTime_Pcm = frame.s;
  // 	}
  // 	let nCurTsAudio = this.m_pPcmPlayer.getTimestamp();
  // 	nTimestampAudio = nCurTsAudio + this.m_nBeginTime_Pcm;
  // 	nDelay = frame.s - nTimestampAudio;
  // }

  //this.logger.logInfo("displayVideoFrame delay=" + delay + "=" + " " + frame.s  + " - (" + audioCurTs  + " + " + this.beginTimeOffset + ")" + "->" + audioTimestamp);

  if (nTimestampAudio <= 0 || nDelay <= 0) {
    //this.logger.logInfo("displayVideoFrame ");
    try {
      // 检查数据大小
      // console.log("frame.d 的长度:", frame.d.length);

      // 确保数据大小在合理范围内
      if (frame.d.length > 0 && frame.d.length < Number.MAX_SAFE_INTEGER) {
        let data = new Uint8Array(frame.d);
        // console.log("Uint8Array 分配成功");
        let width = frame.w;
        let height = frame.h;
        let yLen = frame.y;
        let uvLen = frame.u;
        //this.logger.logInfo("displayVideoFrame data:" + data[0] +" width:" + width + " height:" + height +" yLen:" + yLen+" uvLen:" + uvLen);
        this.fnRenderVideoFrame(data, width, height, yLen, uvLen);
        return true;
      } else {
        console.error("数据大小超出合理范围");
      }
    } catch (e) {
      if (e instanceof RangeError) {
        console.error("内存分配失败:", e);
      } else {
        console.error("发生其他错误:", e);
      }
    }
  }

  return false;
};
//渲染视频帧
Player.prototype.fnRenderVideoFrame = function (
  data,
  width,
  height,
  yLen,
  uvLen
) {
  this.m_pWebGLPlayer.renderFrame(data, width, height, yLen, uvLen);
};
//打码数据send
Player.prototype.fnSendMarkerData = function (e) {
  this.m_pWebGLPlayer.parseAIdata(e);
};
//请求数据
Player.prototype.fnOnRequestData = function (offset, available) {
  // need to add later
};
//设置版本
Player.prototype.fnOnVersion = function (version) {
  this.m_szVersion = version;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ======================== AiInfo about =========================
//设置ai帧
Player.prototype.fnOnAiFrame = function (frame) {
  this.fnPushBufferFrame(frame);
};
//显示ai帧
Player.prototype.fnDisplayAiFrame = function (frame) {
  //this.logger.logInfo("displayVideoFrame begin");
  if (this.m_nState != emState_Running) {
    return false;
  }

  if (this.m_pCallback_AiInfo == null) {
    return false;
  }

  let msg = {
    k: CallBack_AiInfo,
    m: frame.d,
    w: frame.w,
    h: frame.h,
  };
  this.m_pCallback_AiInfo(msg);
  return true;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ======================== Display Loop =========================

//循环显示
Player.prototype.fnDisplayLoop = function () {
  let player = this;

  // 限制缓冲帧数组的大小
  if (this.m_arrBufferFrames.length > MAX_BUFFER_SIZE) {
    this.m_arrBufferFrames.splice(
      0,
      this.m_arrBufferFrames.length - MAX_BUFFER_SIZE
    );
  }

  // 如果状态不是空闲，继续请求动画帧
  if (this.m_nState !== emState_Idle) {
    requestAnimationFrame(this.fnDisplayLoop.bind(this));
  }

  // 如果状态不是运行，直接返回
  if (this.m_nState !== emState_Running) {
    return;
  }

  // 如果正在缓冲，直接返回
  if (this.m_bBuffering) {
    return;
  }

  // 如果缓冲帧数组为空
  if (this.m_arrBufferFrames.length == 0) {
    // 如果解码状态为完成，更新计时器并回调完成函数，停止播放
    if (this.m_nState_Dec == emState_Finished) {
      this.fnUpdateTimerTrack();
      this.fnCallbackMessage(CallBack_Finished);
      this.fnStop();
    }
    return;
  }

  // 处理缓冲帧
  this.processFrames();

  // 如果解码状态为完成且缓冲帧数组为空，更新计时器并回调完成函数，停止播放
  if (
    this.m_nState_Dec == emState_Finished &&
    this.m_arrBufferFrames.length === 0
  ) {
    this.fnUpdateTimerTrack();
    this.fnCallbackMessage(CallBack_Finished);
    this.fnStop();
  }

  // 处理缓冲和播放速度
  this.handleBufferingAndPlaybackSpeed();
};

Player.prototype.processFrames = function () {
  let i = 0;
  // 每次循环最多处理10个帧
  while (i < 10 && this.m_arrBufferFrames.length > 0) {
    let frame = this.m_arrBufferFrames[0]; // 获取第一帧信息
    let tMilliNow = Date.now();

    // 如果帧时间戳和当前时间差超过一定值，跳出循环
    if (
      this.m_tLocalMsecsFirst > 0 &&
      frame.s - this.m_tPtsFirst >
        this.m_nSpeed * (tMilliNow - this.m_tLocalMsecsFirst)
    ) {
      break;
    }

    let nTimeAudio = frame.s + 500;

    // 处理音频缓冲帧
    while (this.arrBufferPcms.length > 0) {
      if (this.arrBufferPcms[0].s > nTimeAudio) {
        break;
      }
      this.fnDisplayAudioFrame(this.arrBufferPcms[0]);
      this.arrBufferPcms.shift();
    }

    // 显示当前帧
    this.displayFrame(frame, tMilliNow);
    i++;
  }
};

Player.prototype.displayFrame = function (frame, tMilliNow) {
  switch (frame.t) {
    case kAudioFrame: // 音频帧
      if (this.fnDisplayAudioFrame(frame)) {
        this.m_arrBufferFrames.shift(); // 移除已处理帧
      }
      break;
    case kVideoFrame: // 视频帧
      if (this.fnDisplayVideoFrame(frame)) {
        if (this.m_tLocalMsecsFirst <= 0) {
          // 根据URL类型区分回放和直播，计算偏移量
          this.m_tLocalMsecsFirst = !this.m_pUrlInfo.isStream
            ? tMilliNow - this.m_time_SkipPlayer * 1000
            : tMilliNow;
          this.m_tPtsFirst = frame.s;
        }
        this.m_tLocalMsecsLast = tMilliNow;
        this.m_tPtsLast = frame.s;
        this.m_arrBufferFrames.shift();

        // 回放时判断是否到达最大时间，停止播放
        if (
          kProtoType_HTTP === this.m_pUrlInfo.proto &&
          !this.m_pUrlInfo.isStream &&
          frame.s / 1000 >= this.m_pTimeTrack.max
        ) {
          setTimeout(() => this.fnStop(), 1000);
        }
      }
      break;
    case kAiFrame: // AI帧
      this.fnDisplayAiFrame(frame);
      this.m_arrBufferFrames.shift();
      break;
    default:
      break;
  }
};

Player.prototype.handleBufferingAndPlaybackSpeed = function () {
  if (!this.m_nState_SkipPlayer) {
    // 非回放
    let nDuration = this.fnGetDurationOfBufferFrames();

    // 如果缓冲帧时长小于设定值，调整解码器状态和播放速度
    if (nDuration < this.m_tMilliSecsOfBuff_Set) {
      if (this.m_nState_Dec === emState_Pausing) {
        this.fnResumeDecoder();
      }

      if (
        this.m_pUrlInfo &&
        this.m_pUrlInfo.isStream &&
        this.m_nSpeed !== this.m_pUrlInfo.speed
      ) {
        this.m_nSpeed = this.m_pUrlInfo.speed;
        this.m_tLocalMsecsFirst = 0;
      }

      if (
        nDuration < this.m_tMilliSecsOfBuff_Min &&
        this.m_nState_Dec !== emState_Finished
      ) {
        this.fnStartBuffering();
      }
    }
    // 如果实时延时累积，进行加速播放
    else if (
      this.m_pUrlInfo.isStream &&
      this.m_bIsRealTime &&
      nDuration > this.m_tMilliSecsOfBuff_2X
    ) {
      if (this.m_nSpeed === this.m_pUrlInfo.speed) {
        this.m_nSpeed = this.m_pUrlInfo.speed * 2;
        this.m_tLocalMsecsFirst = 0;
      }
    }
  }
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ======================== Downloader Operation =========================
//创建新worker下载
Player.prototype.fnNewWorkerDownloader = function () {
  let player = this;
  this.m_pWorker_Dld = new Worker(new URL("./downloader.js", import.meta.url), {
    type: "module",
  });
  this.m_pWorker_Dld.onmessage = function (evt) {
    let objData = evt.data;
    switch (objData.t) {
      case kRsp_DownloadStart: //开始下载
        player.fnOnDownloaderStart(objData);
        break;
      case kRsp_DownloadStop: //停止下载
        player.fnOnDownloaderStop(objData);
        break;
      case kRsp_DownloadPause: //暂停下载
        player.fnOnDownloaderPause(objData);
        break;
      case kRsp_DownloadResume: //恢复下载
        player.fnOnDownloaderResume(objData);
        break;
      case kRsp_DownloadMore: //更多下载
        player.fnOnDownloaderMore(objData);
        break;
      case kRsp_DurationChange: //持续时间改变
        player.fnOnDurationChange(objData);
        break;
      case kUriData: //uri数据
        player.fnOnUriData(objData.d, objData.q);
        break;
      case kUriDataFinished: //uri数据完成
        player.fnOnDownloaderFinished(objData);
        break;
      case kRsp_ProfileData:
        player.fnParseProfile(objData.data);
        break;
      case kRsp_FileTimeLength: //获取m3u8文件总时长信息
        let proto = player.m_pUrlInfo.proto;
        if (kProtoType_HTTP_M3U8 == proto) {
          let duration = objData.d;
          if (!player.m_nState_SkipPlayer) {
            player.m_fDurationSecs = duration;
            player.m_pTimeTrack.max = duration;
          } else {
            //由于查询ts 时刻有偏差，所以需要更新偏移值
            player.m_time_SkipPlayer = player.m_fDurationSecs - duration;
            // console.log("=======ts文件时长计算==更新跳转偏移量==============",player.m_time_SkipPlayer)
          }
        }
        break;
      case kRsp_DownloadChangeTime: //时间跳转
        player.fnStartDownloader();
        player.fnStartDecoder();
        player.fnStartBuffering();
        break;
    }
  };
};

//清除url指定参数
function removeQueryParam(url, paramName) {
  // 创建一个新的URL对象
  let urlObj = new URL(url);

  // 获取URL的搜索参数
  let params = urlObj.searchParams;

  // 删除指定的查询参数
  params.delete(paramName);

  // 重新构建URL（不包括原始的查询字符串）
  urlObj.search = params.toString();

  // 返回修改后的URL
  return urlObj.toString();
}
//检查并创建新下载器
Player.prototype.fnCheckAndNewDownloader = function () {
  if (!this.m_pWorker_Dld && this.m_nState_Dld != emState_Finished) {
    this.fnNewWorkerDownloader();
  }
};
//开始下载（发送消息）
Player.prototype.fnStartDownloader = function () {
  this.fnCheckAndNewDownloader();
  let msgReq = {
    t: kReq_DownloadStart, //开始下载
    p: this.m_pUrlInfo.proto, //原型
    u: this.m_pUrlInfo.url, //地址
    i: this.m_pUrlInfo.isStream, //是否是回放
    q: this.m_nSeq, //序号
    k: window.sessionStorage.getItem(ProfileKey_Note[0]),
  };
  this.m_pWorker_Dld.postMessage(msgReq);
};
//停止下载
Player.prototype.fnStopDownloader = function () {
  // console.log("=====停止下载==状态=====",this.m_nState_Dld);
  if (!this.m_pWorker_Dld) {
    return;
  }

  switch (this.m_nState_Dld) {
    case emState_Idle:
      {
      }
      break;
    case emState_Pausing:
    case emState_Running:
    case emState_Finished:
      {
        let msgReq = {
          t: kReq_DownloadStop,
        };
        this.m_pWorker_Dld.postMessage(msgReq);
      }
      break;
    default:
      break;
  }
};
//恢复下载
Player.prototype.fnResumeDownloader = function () {
  // console.log("=====恢复下载==状态=====",this.m_nState_Dld);
  this.fnCheckAndNewDownloader();
  switch (this.m_nState_Dld) {
    case emState_Idle:
      {
        this.fnStartDownloader();
      }
      break;
    case emState_Finished:
    case emState_Running:
      {
      }
      break;
    case emState_Pausing:
      {
        let msgReq = {
          t: kReq_DownloadResume,
        };
        this.m_pWorker_Dld.postMessage(msgReq);
      }
      break;
    default:
      break;
  }
};
//更多下载
Player.prototype.fnMoreDownloader = function () {
  // console.log("=====更多下载==状态=====",this.m_nState_Dld);
  switch (this.m_nState_Dld) {
    case emState_Idle:
      {
        this.fnStartDownloader();
      }
      break;
    case emState_Finished:
    case emState_Running:
      {
      }
      break;
    case emState_Resume:
      {
        let msgReq = {
          t: kReq_DownloadMore,
        };
        this.m_pWorker_Dld.postMessage(msgReq);
      }
      break;
    default:
      break;
  }
};
//暂停下载
Player.prototype.fnPauseDownloader = function () {
  // console.log("=====暂停下载==状态=====",this.m_nState_Dld);
  this.fnCheckAndNewDownloader();
  switch (this.m_nState_Dld) {
    case emState_Idle:
      {
        // error for didnot init
        // this.fnStartDownload();
      }
      break;
    case emState_Running:
      {
        let msgReq = {
          t: kReq_DownloadPause,
        };
        this.m_pWorker_Dld.postMessage(msgReq);
      }
      break;
    case emState_Pausing:
      let msgReq = {
        t: kReq_DownloadPause,
      };
      this.m_pWorker_Dld.postMessage(msgReq);
      break;
    case emState_Finished:
      {
      }
      break;
    default:
      break;
  }
};
//（数据解析）启动（开始）下载
Player.prototype.fnOnDownloaderStart = function (objData) {
  if (objData.e == 0) {
    this.m_nState_Dld = emState_Running;
    this.m_pWorker_Dec.postMessage(objData);
  } else {
    this.fnReportErrorPlayer(Error_Downloader_Start);
    this.fnStop();
  }
};
//（数据解析）停止下载
Player.prototype.fnOnDownloaderStop = function (objData) {
  if (objData.e == 0) {
    this.m_nState_Dld = emState_Idle;
  } else {
    this.fnReportErrorPlayer(Error_Downloader_Stop);
  }
};
//（数据解析）暂停下载
Player.prototype.fnOnDownloaderPause = function (objData) {
  if (objData.e == 0) {
    this.m_nState_Dld = emState_Pausing;
  } else {
    this.fnReportErrorPlayer(Error_Downloader_Pause);
  }
};
//（数据解析）恢复下载
Player.prototype.fnOnDownloaderResume = function (objData) {
  if (objData.e == 0) {
    this.m_nState_Dld = emState_Resume;
  } else {
    this.fnReportErrorPlayer(Error_Downloader_Resume);
  }
};
//（数据解析）更多下载
Player.prototype.fnOnDownloaderMore = function (objData) {
  if (objData.e == 0) {
    this.m_nState_Dld = emState_Pausing;
  } else {
    this.fnReportErrorPlayer(Error_Downloader_More);
  }
};
//（数据解析）完成下载
Player.prototype.fnOnDownloaderFinished = function (objData) {
  this.m_nState_Dld = emState_Finished;
  objData.t = kDataFinished;
  this.m_pWorker_Dec.postMessage(objData);
};
//（数据解析）持续时间变更
Player.prototype.fnOnDurationChange = function (objData) {
  this.fnSetDuration(objData.n);
};
//资源标识符数据
Player.prototype.fnOnUriData = function (data, seq) {
  if (this.m_nState != emState_Pausing && this.m_nState != emState_Running) {
    return;
  }

  if (this.m_nState_Dec == emState_Finished) {
    return;
  }

  if (this.m_pWorker_Dec == null || this.m_nState_Dec == emState_Idle) {
    this.m_arrCache.push(data);
    return;
  }

  if (this.m_arrCache.length > 0) {
    for (let i = 0; i < this.m_arrCache.length; i++) {
      let obj = this.m_arrCache[i];
      let objData = {
        t: kFeedData,
        d: obj,
      };

      this.m_pWorker_Dec.postMessage(objData, [objData.d]);
    }
    this.m_arrCache.length = 0;
  }

  let objData = {
    t: kFeedData,
    d: data,
  };
  this.m_pWorker_Dec.postMessage(objData, [objData.d]);
};

//时间跳转操作
Player.prototype.fnPlayerSkipTime = function (info) {
  let player = this;

  //更新标识
  player.m_nState_SkipPlayer = true;
  player.m_time_SkipPlayer = info;
  player.m_pTimeLabel.innerHTML =
    player.fnFormatTime(info) +
    "/" +
    player.fnFormatTime(player.m_fDurationSecs);

  //更新地址（seekFromBegin={secs}）
  player.m_pUrlInfo.url = removeQueryParam(
    player.m_pUrlInfo.url,
    "seekFromBegin"
  );
  player.m_pUrlInfo.url = player.m_pUrlInfo.url + "?seekFromBegin=" + info;

  //标识重置
  player.arrBufferPcms = [];
  player.m_arrBufferFrames = [];
  player.fnClearBufferFrames();
  player.m_tPtsFirst = 0;
  player.m_tPtsLast = 0;
  player.fnShowLoading();

  //区分url类型
  let proto = this.m_pUrlInfo.proto;
  if (kProtoType_HTTP == proto) {
    player.fnStartDownloader();
    player.fnStartDecoder();
    player.fnStartBuffering();
  } else {
    let msgReq = {
      t: kReq_DecoderSkipTime, // 消息类型：跳帧（时间）
      index: info, //跳帧下标
      streamType: player.m_pUrlInfo.proto, //流类型
    };
    player.m_pWorker_Dld.postMessage(msgReq);
  }

  player.m_nFlag_SkipOpt = false;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ======================== Decoder Operation =========================
//创建新worker解码器
Player.prototype.fnNewWorkerDecoder = function () {
  let player = this;
  this.m_pWorker_Dec = new Worker(new URL("./decoder.js", import.meta.url), {
    type: "module",
  });
  this.m_pWorker_Dec.onmessage = function (evt) {
    let objData = evt.data;
    switch (objData.t) {
      case kReq_DecoderPause: //解码暂停
        player.fnOnDecoderPause(objData);
        break;
      case kReq_DecoderResume: //解码恢复
        player.fnOnDecoderResume(objData);
        break;
      case kVideoInfo: //video信息
        player.fnOnVideoInfo(objData);
        break;
      case kAudioInfo: //audio信息
        player.fnOnAudioInfo(objData);
        break;
      case kVideoFrame: //video帧
        player.fnOnVideoFrame(objData);
        break;
      case kAudioFrame: //audio帧
        player.fnOnAudioFrame(objData);
        break;
      case kAiFrame: //ai帧信息
        player.fnOnAiFrame(objData);
        break;
      case kFinishedEvt: //完成图像发送
        player.fnOnDecoderFinished(objData);
        break;
      case kAuthErr: //鉴权错位
        player.fnOnDecoderAuthErr(objData);
        break;
      case kDecoderDataFull: //解码数据满
        player.fnPauseDownloader();
        break;
      case kDecoderDataMore: //更多解码数据
        player.fnMoreDownloader();
        break;
      case kRequestDataEvt: //请求数据发送
        player.fnOnRequestData(objData.o, objData.a);
        break;
      case kRsp_DecoderSeekTo: //解码定位
        // player.fnOnSeekToRsp(objData.r);
        break;
      // case kRsp_DecoderStart:
      // 	player.fnOnDecoderStart(objData);
      // 	break;
      case kWriteFrame:
        {
          //写帧（数据）
          // if(objData.l > 0)
          // {
          // 	player.Stream.push(objData.d);
          // }
          // else{
          // 	let len = 0;
          // 	for(let i=0;i<player.Stream.length;++i)
          // 	{
          // 		len += player.Stream[i].length;
          // 	}
          // 	let newStream = new Uint8Array(len);
          // 	let nIndex = 0;
          // 	for(let i=0;i<player.Stream.length;++i)
          // 	{
          // 		newStream.set(player.Stream[i], nIndex);
          // 		nIndex += player.Stream[i].length;
          // 	}
          // 	let blob = new Blob([newStream], {
          // 		type: "text/plain;charset=utf-8"
          // 	});
          // 	saveAs(blob, "file/file.txt"); //saveAs(blob,filename)
          // 	player.Stream = new Uint8Array();
          // }
        }
        break;
      case kVersion:
        {
          player.fnOnVersion(objData.v);
        }
        break;
      case kReauth:
        {
          if (!player.m_bSendAuth) {
            window.sessionStorage.removeItem(AuthKey_Note);
            player.m_bSendAuth = true;
            player.fnStartTimerAuth();
          }
        }
        break;
    }
  };
  this.m_nState_Dec = emState_Idle;
};
//检查是否存在decode、创建相关对象
Player.prototype.fnCheckAndNewWorkerDecoder = function () {
  if (!this.m_pWorker_Dec) {
    this.fnNewWorkerDecoder();
  }
};

Player.prototype.fnServerUUID = function () {
  let uuid = window.sessionStorage.getItem(ProfileKey_Note[0]);
  if (uuid) {
    return;
  }

  let msgReq = {
    t: kReq_uuid,
    u: uuid,
  };
  this.m_pWorker_Dec.postMessage(msgReq);
};

Player.prototype.fnNetDomain = function () {
  let domain = Signature.getDomainFromUrl(window.location.href);
  let msgReq = {
    t: kReq_domain,
    u: domain,
  };
  this.m_pWorker_Dec.postMessage(msgReq);
};
//开始解码
Player.prototype.fnStartDecoder = function () {
  this.fnCheckAndNewWorkerDecoder();
  // this.m_bSendProfile = true;
  // this.m_bSendAuth = true;
  this.fnStartTimerAuth();
  let msgReq = {
    t: kReq_DecoderStart,
    c: this.m_pUrlInfo.chunkSize,
    i: this.m_pUrlInfo.type,
    v: this.m_nTimerInterval_Dec,
    l: this.m_pUrlInfo.logLv,
    k: window.sessionStorage.getItem(ProfileKey_Note[0]),
    u: window.location.href,
  };
  this.m_pWorker_Dec.postMessage(msgReq);
};
//停止解码
Player.prototype.fnStopDecoder = function () {
  if (!this.m_pWorker_Dec) {
    return;
  }

  switch (this.m_nState_Dec) {
    case emState_Pausing:
    case emState_Running:
    case emState_Finished:
      {
        this.m_pWorker_Dec.postMessage({
          t: kReq_DecoderStop,
        });
      }
      break;
    case emState_Idle:
      break;
  }
};
//恢复解码
Player.prototype.fnResumeDecoder = function () {
  this.fnCheckAndNewWorkerDecoder();
  switch (this.m_nState_Dec) {
    case emState_Idle:
      // console.log("=========(恢复解码)==开始==========")
      this.fnStartDecoder();
      break;
    case emState_Running:
      // console.log("=========(恢复解码)==播放中=======")
      break;
    case emState_Pausing:
      // console.log("=========(恢复解码)==暂停=========")
      let msgReq = {
        t: kReq_DecoderResume,
      };
      this.m_pWorker_Dec.postMessage(msgReq);
      break;
    case emState_Resume:
      // console.log("========(恢复解码)==恢复=========")
      break;
    case emState_Finished:
      // console.log("========(恢复解码)==关闭=========")
      break;
  }
};
//暂停解码
Player.prototype.fnPauseDecoder = function () {
  this.fnCheckAndNewWorkerDecoder();
  switch (this.m_nState_Dec) {
    case emState_Idle:
      // console.log("=========（暂停解码）==开始======")
      // let msgReq1 = {
      // 	t: kReq_DecoderStart
      // };
      // this.m_pWorker_Dec.postMessage(msgReq1);
      break;
    case emState_Running:
      // console.log("=========（暂停解码）==播放中=====")
      // let msgReq2 = {
      // 	t: kReq_DecoderRunning
      // };
      // this.m_pWorker_Dec.postMessage(msgReq2);
      break;
    case emState_Pausing:
      // console.log("==========（暂停解码）==暂停======")
      let msgReq3 = {
        t: kReq_DecoderPause,
      };
      this.m_pWorker_Dec.postMessage(msgReq3);
      break;
    case emState_Resume:
      // console.log("=========（暂停解码）==恢复=======")
      // let msgReq4 = {
      // 	t: kReq_DecoderResume
      // };
      // this.m_pWorker_Dec.postMessage(msgReq4);
      break;
    case emState_Finished:
      // console.log("==========（暂停解码）==关闭========")
      let msgReq5 = {
        t: kReq_DecoderStop,
      };
      this.m_pWorker_Dec.postMessage(msgReq5);
      break;
  }
};
//（数据解析）解码启动
Player.prototype.fnOnDecoderStart = function (objData) {
  if (objData.e == 0) {
    this.m_nState_Dec = emState_Running;
  } else {
    this.fnReportErrorPlayer(Error_Decoder_Start);
    this.fnStop();
  }
};
//（数据解析）解码暂停
Player.prototype.fnOnDecoderPause = function (objData) {
  if (objData.e == 0) {
    this.m_nState_Dec = emState_Pausing;
  } else {
    this.fnReportErrorPlayer(Error_Decoder_Pause);
  }
};
//（数据解析）解码恢复
Player.prototype.fnOnDecoderResume = function (objData) {
  if (objData.e == 0) {
    this.m_nState_Dec = emState_Running;
  } else {
    this.fnReportErrorPlayer(Error_Decoder_Resume);
  }
};
//（数据解析）解码停止
Player.prototype.fnOnDecoderStop = function (objData) {
  if (objData.e == 0) {
    this.m_nState_Dec = emState_Idle;
  } else {
    this.fnReportErrorPlayer(Error_Decoder_Stop);
  }
};
//（数据解析）解码完成
Player.prototype.fnOnDecoderFinished = function (objData) {
  // this.fnStopDecoder();
  this.m_nState_Dec = emState_Finished;
  this.fnStopBuffering();
  this.fnStopDownloader();
  // this.fnCallbackMessage(CallBack_Finished);
};
//（数据解析）解码身份验证错误
Player.prototype.fnOnDecoderAuthErr = function (objData) {
  this.fnReportErrorPlayer(Error_Decoder_Auth);
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ======================== Buffering Frames =========================
//设置缓冲时间
Player.prototype.fnSetBufferTime = function (milliSecs) {
  if (this.m_pUrlInfo.type == STREAM_TYPE_HLS && milliSecs < this.m_tDuration) {
    return;
  }

  this.m_tMilliSecsOfBuff_Set = milliSecs;
  this.m_tMilliSecsOfBuff_2X = this.m_tMilliSecsOfBuff_Set + 500;
  this.m_tMilliSecsOfBuff_Min = Math.max(
    g_nMilliSecsOfBuff_Min_Default,
    milliSecs >> this.m_nRightShiftBits
  );
  this.m_tMilliSecsOfBuff_Max = Math.min(
    g_nMilliSecsOfBuff_Max_Default,
    milliSecs << this.m_nLeftShiftBits
  );
};
//设置持续时间
Player.prototype.fnSetDuration = function (milliSecs) {
  if (!this.m_pUrlInfo.isStream) {
    return;
  }
  if (this.m_tDuration < milliSecs) {
    this.m_tDuration = milliSecs;
  }

  if (milliSecs <= this.m_tMilliSecsOfBuff_Set) {
    return;
  }
  this.fnSetBufferTime(milliSecs);
};
//获取缓冲帧的持续时间
Player.prototype.fnGetDurationOfBufferFrames = function () {
  if (!this.m_arrBufferFrames || this.m_arrBufferFrames.length == 0) {
    return 0;
  }

  let oldest = this.m_arrBufferFrames[0];
  let newest = this.m_arrBufferFrames[this.m_arrBufferFrames.length - 1];
  return newest.s - oldest.s;
};
//存放缓存帧
Player.prototype.fnPushBufferFrame = function (frame) {
  let player = this;
  let time = frame.s;
  if (time < this.m_tPtsFirst || time < this.m_tPtsLast) {
    //防止时间倒叙存放
    return;
  }

  player.m_arrBufferFrames.push(frame);
  player.fnUpdateTimerTrackMax(frame.s);
  let nDurationBuff = player.fnGetDurationOfBufferFrames();
  if (nDurationBuff >= player.m_tMilliSecsOfBuff_Set) {
    player.fnStopBuffering();
    if (nDurationBuff > player.m_tMilliSecsOfBuff_Max) {
      player.fnPauseDecoder();
    }
  }

  if (player.m_nState_Dec == emState_Finished) {
    player.fnStopBuffering();
  }
};

//执行存储bufferFrame业务
function pushBufferFrameModule(frame, player) {
  player.m_arrBufferFrames.push(frame);
  player.fnUpdateTimerTrackMax(frame.s);
  let nDurationBuff = player.fnGetDurationOfBufferFrames();
  if (nDurationBuff >= player.m_tMilliSecsOfBuff_Set) {
    player.fnStopBuffering();
    if (nDurationBuff > player.m_tMilliSecsOfBuff_Max) {
      player.fnPauseDecoder();
    }
  }

  if (player.m_nState_Dec == emState_Finished) {
    player.fnStopBuffering();
  }
}
//清除缓存帧
Player.prototype.fnClearBufferFrames = function () {
  this.m_arrBufferFrames = [];
  this.m_tLocalMsecsFirst = 0;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ======================== Buffering Operation =========================
//设置缓存状态
Player.prototype.fnSetBuffering = function (istrue) {
  if (istrue) {
    this.fnShowLoading();
  } else {
    this.fnHideLoading();
  }
  this.m_bBuffering = istrue;
};
//开始缓存
Player.prototype.fnStartBuffering = function () {
  if (this.m_bBuffering) {
    return;
  }

  this.fnSetBuffering(true);

  //Pause audio context.
  if (this.m_pPcmPlayer) {
    this.m_pPcmPlayer.pause();
  }

  // this.fnResumeDownloader();
  //Restart decoding.
  this.fnResumeDecoder();
  //Stop track timer.
  this.fnStopTimerTrack();

  // 初始化本地时间
  this.m_tLocalMsecsFirst = 0;
};
//停止缓存
Player.prototype.fnStopBuffering = function () {
  if (!this.m_bBuffering) {
    return;
  }

  this.fnSetBuffering(false);

  if (this.m_pPcmPlayer && this.m_nState == emState_Running) {
    //Resume audio context.
    this.m_pPcmPlayer.resume();
  }

  //Restart track timer.
  this.fnStartTimerTrack();
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ======================== Timer Track =========================
//启动计时器轨道
Player.prototype.fnStartTimerTrack = function () {
  let player = this;
  if (player.m_pTimer_Track != null) {
    window.clearInterval(player.m_pTimer_Track);
  }
  this.m_pTimer_Track = setInterval(function () {
    if (!player.m_nFlag_SkipOpt) {
      player.fnUpdateTimerTrack();
    }
  }, this.m_nTimerInterval_Track);
};
//暂停计时器轨道
Player.prototype.fnPauseTimerTrack = function () {
  if (this.m_pTimer_Track != null) {
    clearInterval(this.m_pTimer_Track);
    this.m_pTimer_Track = null;
  }
};
//停止计时器轨道
Player.prototype.fnStopTimerTrack = function () {
  if (this.m_pTimer_Track != null) {
    clearInterval(this.m_pTimer_Track);
    this.m_pTimer_Track = null;
  }
  this.m_tPtsLast = 0;
};
//初始化计时器轨道
Player.prototype.fnInitTimerTrack = function () {
  if (this.m_pTimeTrack) {
    this.m_pTimeTrack.value = 0;
    this.m_pTimeTrack.max = 0;
    this.m_szDurationDisplay = "00:00:00";
  }

  if (this.m_pTimeLabel) {
    this.m_pTimeLabel.innerHTML = "00:00:00/00:00:00";
  }
};
//更新计时器轨道值
Player.prototype.fnUpdateTimerTrackValue = function (pts) {
  if (this.m_pTimeTrack) {
    if (this.m_pTimeTrack.value == pts) {
      return false;
    }

    let time = Math.floor(pts / 1000);
    if (this.m_nState_SkipPlayer) {
      //回放跳转时间偏移量计算
      time += this.m_time_SkipPlayer;
    }
    this.m_pTimeTrack.value = time;
    if (this.m_pTimeTrack.max >= time) {
      if (this.formatTime) {
        this.m_szDurationDisplay = this.formatTime(pts / 1000);
      }
    } else {
      return false;
    }

    return true;
  } else {
    return false;
  }
};
//更新计时器轨迹最大值
Player.prototype.fnUpdateTimerTrackMax = function (pts) {
  if (this.m_pTimeTrack) {
    this.m_szDurationDisplay = this.fnFormatTime(pts / 1000);
  }
};

// 更新当前播放时刻文本信息
Player.prototype.fnUpdateTimerTrack = function () {
  if (
    this.m_nState != emState_Running &&
    this.m_nState != emState_Pausing &&
    this.m_nFlag_SkipOpt
  ) {
    return;
  }

  if (this.m_pTimeTrack) {
    if (this.fnUpdateTimerTrackValue(this.m_tPtsLast)) {
      if (this.m_pTimeLabel) {
        let nSecsLastPts = this.m_tPtsLast / 1000;
        let currentPlayerTime = nSecsLastPts;
        if (this.m_nState_SkipPlayer) {
          //回放跳转时间偏移量计算
          currentPlayerTime += this.m_time_SkipPlayer;
        }
        this.m_pTimeLabel.innerHTML =
          this.fnFormatTime(currentPlayerTime) +
          "/" +
          this.fnFormatTime(this.m_fDurationSecs);
      }
    }
  }
};
//将秒数格式化为HH:MM:SS这种格式
function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(secs).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ======================== Loading Operation =========================
//设置加载对象（元素）
Player.prototype.fnSetLoadingDiv = function (loadingDiv) {
  this.m_pLoadingDiv = loadingDiv;
};
//隐藏加载对象（元素）
Player.prototype.fnHideLoading = function () {
  if (!this.m_bBuffering) {
    return;
  }

  if (this.m_pLoadingDiv != null) {
    this.m_pLoadingDiv.style.display = "none";
  }

  this.fnCallbackMessage(
    CallBack_Loading,
    FALSE_XM,
    CallBack_Note[CallBack_Loading] + " " + Loading_Note[0]
  );
};
//显示加载对象（元素）
Player.prototype.fnShowLoading = function () {
  if (this.m_bBuffering) {
    return;
  }

  if (this.m_pLoadingDiv != null) {
    this.m_pLoadingDiv.style.display = "block";
  }

  this.fnCallbackMessage(
    CallBack_Loading,
    TRUE_XM,
    CallBack_Note[CallBack_Loading] + " " + Loading_Note[1]
  );
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ======================== Outside Operation =========================
//设置轨迹
Player.prototype.fnSetTrack = function (
  timeTrack,
  timeLabel,
  progressBarModal
) {
  this.m_pTimeTrack = timeTrack;
  this.m_pTimeLabel = timeLabel;
  this.m_pProgressBarModal = progressBarModal;

  if (this.m_pTimeTrack) {
    // let player = this;
    // this.m_pTimeTrack.oninput = function() {
    // 	// if (!player.seeking) {
    // 	// 	player.seekTo(player.m_pTimeTrack.value);
    // 	// }
    // }
    // this.m_pTimeTrack.onchange = function() {
    // 	// if (!player.seeking) {
    // 	// 	player.seekTo(player.m_pTimeTrack.value);
    // 	// }
    // }
  }

  //是否隐藏进度条模块（特殊处理，在直播时隐藏、回放时显示）
  if (this.m_pProgressBarModal) {
    if (this.m_pUrlInfo.isStream) {
      this.m_pProgressBarModal.style.display = "none";
    } else {
      this.m_pProgressBarModal.style.display = "";
    }
  }

  let isStream = this.m_pUrlInfo.isStream;

  //flv 回放统计时长
  let proto = this.m_pUrlInfo.proto;
  if (kProtoType_HTTP == proto) {
    if (!isStream) {
      let duration = calculateTimeDifference(
        this.m_pUrlInfo.endDate,
        this.m_pUrlInfo.startDate
      );
      this.m_fDurationSecs = duration / 1000;
      this.m_pTimeTrack.max = duration / 1000;
    }
  }
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ======================== Common Operation =========================
//格式化时间（hh:mm:ss）
Player.prototype.fnFormatTime = function (s) {
  let hour =
    Math.floor(s / 3600) < 10
      ? "0" + Math.floor(s / 3600)
      : Math.floor(s / 3600);
  let min =
    Math.floor((s / 60) % 60) < 10
      ? "0" + Math.floor((s / 60) % 60)
      : Math.floor((s / 60) % 60);
  let sec =
    Math.floor(s % 60) < 10 ? "0" + Math.floor(s % 60) : Math.floor(s % 60);
  return hour + ":" + min + ":" + sec;
};
//（触发）回调消息
Player.prototype.fnCallbackMessage = function (ret, status, message) {
  if (this.m_fnCallback == null) {
    return -1;
  }

  let msg = {
    ret: ret,
    status: status || 0,
    message: message || CallBack_Note[ret],
  };
  this.m_fnCallback(msg);
  return 0;
};
//播放器报告错误
Player.prototype.fnReportErrorPlayer = function (error, status, message) {
  let stErr = {
    ret: CallBack_Error,
    error: error || Error_Common,
    status: status || 0,
    message: message,
  };

  if (this.m_fnCallback) {
    this.m_fnCallback(stErr);
  }
};
//注册可见性事件
Player.prototype.fnRegisterVisibilityEvent = function (cb) {
  let szHidden = "hidden";

  // Standards:
  if (szHidden in document) {
    document.addEventListener("visibilitychange", fnOnchange);
  } else if ((szHidden = "mozHidden") in document) {
    document.addEventListener("mozvisibilitychange", fnOnchange);
  } else if ((szHidden = "webkitHidden") in document) {
    document.addEventListener("webkitvisibilitychange", fnOnchange);
  } else if ((szHidden = "msHidden") in document) {
    document.addEventListener("msvisibilitychange", fnOnchange);
  } else if ("onfocusin" in document) {
    // IE 9 and lower.
    document.onfocusin = document.onfocusout = fnOnchange;
  } else {
    // All others.
    window.onpageshow =
      window.onpagehide =
      window.onfocus =
      window.onblur =
        fnOnchange;
  }

  function fnOnchange(evt) {
    let v = true;
    let h = false;
    let evtMap = {
      focus: v,
      focusin: v,
      pageshow: v,
      blur: h,
      focusout: h,
      pagehide: h,
    };

    evt = evt || window.event;
    let visible = v;
    if (evt.type in evtMap) {
      visible = evtMap[evt.type];
    } else {
      visible = this[szHidden] ? h : v;
    }
    cb(visible);
  }

  // set the initial state (but only if browser supports the Page Visibility API)
  if (document[szHidden] !== undefined) {
    fnOnchange({
      type: document[szHidden] ? "blur" : "focus",
    });
  }
};

Player.prototype.fnDealTimerAuth = function () {
  let player = this;
  if (!this.m_pWorker_Dec) {
    return;
  }

  if (this.m_bSendProfile) {
    let szProfile = window.sessionStorage.getItem(ProfileKey_Note[0]);
    if (szProfile) {
      let msgReq = {
        t: kReq_Profile,
        u: szProfile,
      };
      this.m_pWorker_Dec.postMessage(msgReq);
      this.m_bSendProfile = false;
    } else {
      this.fnGetProfile();
    }
  }

  if (this.m_bSendAuth) {
    let szAuth = window.sessionStorage.getItem(AuthKey_Note);
    if (szAuth) {
      let msgReq = {
        t: kReq_Auth,
        a: szAuth,
      };
      this.m_pWorker_Dec.postMessage(msgReq);
      this.m_bSendAuth = false;
      window.setTimeout(function () {
        window.sessionStorage.removeItem(AuthKey_Note);
        player.m_bSendAuth = true;
        player.fnStartTimerAuth();
      }, g_nMilliSecsOfBuff_Set);
    } else {
      if (3 < this.nReqAuthCount) {
        this.AuthErrorByStop();
        console.error("Not authorized, please contact us");
      }
    }
    this.fnRequestAuth();
  }

  if (!this.m_bSendProfile && !this.m_bSendAuth) {
    this.fnStopTimerAuth();
  }
};

Player.prototype.fnStartTimerAuth = function () {
  if (this.m_pTimer_Auth) {
    return;
  }

  let player = this;
  this.m_pTimer_Auth = setInterval(function () {
    player.fnDealTimerAuth();
  }, AuthRate_time);
};

Player.prototype.fnStopTimerAuth = function () {
  if (this.m_pTimer_Auth) {
    clearInterval(this.m_pTimer_Auth);
    this.m_pTimer_Auth = null;
  }
};

//像素化
Player.prototype.pixelation = function (ctx, x, y, width, height, pixelSize) {
  const imageData = ctx.getImageData(x, y, width, height);
  const data = imageData.data;
  for (let i = 0; i < height; i += pixelSize) {
    for (let j = 0; j < width; j += pixelSize) {
      const red = data[(i * width + j) * 4];
      const green = data[(i * width + j) * 4 + 1];
      const blue = data[(i * width + j) * 4 + 2];
      ctx.fillStyle = `rgb(${red},${green},${blue})`;
      ctx.fillRect(x + j, y + i, pixelSize, pixelSize);
    }
  }
};

//模糊化
Player.prototype.blurring = function (ctx, x, y, width, height, blurRadius) {
  const imageData = ctx.getImageData(x, y, width, height);
  const data = imageData.data;
  const tempData = new Uint8ClampedArray(data);

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let red = 0,
        green = 0,
        blue = 0,
        count = 0;
      for (let dy = -blurRadius; dy <= blurRadius; dy++) {
        for (let dx = -blurRadius; dx <= blurRadius; dx++) {
          const ny = i + dy;
          const nx = j + dx;
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const index = (ny * width + nx) * 4;
            red += tempData[index];
            green += tempData[index + 1];
            blue += tempData[index + 2];
            count++;
          }
        }
      }
      const idx = (i * width + j) * 4;
      data[idx] = red / count;
      data[idx + 1] = green / count;
      data[idx + 2] = blue / count;
    }
  }
  ctx.putImageData(imageData, x, y);
};

export { TimerCheck, FileInfo, FunsExtend_Stream, FunExtend_NotStream, Player };
