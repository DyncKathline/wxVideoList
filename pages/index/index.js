//获取音频上下文
const backgroundAudioManager = wx.getBackgroundAudioManager();
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
	data: {
		isLoadedAll: false,
		musicIndex: null,
		videoIndex: null,
		currentTabsIndex: 0,
		pageIndex: 1,
    isRequesting: false,//是否在请求数据，防止多次请求
		lastPosition: 10,//距离列表最后的几个进行数据加载
		videoList: [],
		audioList:[
			{
				'coverimg': "https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg",
				'description': "这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，",
				'id': "50",
				'resource_add': "http://zhangmenshiting.qianqian.com/data2/music/6c2983881c95968fbb0f4fd334c5d526/599527734/599527734.mp3?xcode=7c9d9130f46d992ba0cc505dc0621a48",
				'title': "音频1",
				'type': "1"	
			},
			{
				'coverimg': "https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg",
				'description': "这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，",
				'id': "51",
				'resource_add': "http://zhangmenshiting.qianqian.com/data2/music/6c2983881c95968fbb0f4fd334c5d526/599527734/599527734.mp3?xcode=7c9d9130f46d992ba0cc505dc0621a48",
				'title': "音频2",
				'type': "1"
			}
		]
	},

    /**
     * 生命周期函数--监听页面加载
     */
	onLoad: function (options) {
		//加载数据
		//这里数据写死，假装我是在服务器拿到的数据
    const list = [
			{
				'coverimg':"https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg",
				'description':"这是第一个示例，这是第一个示例，这是第一个示例，这是第一个示例。这是第一个示例，这是第一个示例，这是第一个示例，这是第一个示例。",
				'id':"41",
				'resource_add':"http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
				'title':" 第三期 Beatles 01",
				'type':"1"
			},
			{
				'coverimg': "https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg",
				'description': "",
				'id': "42",
				'resource_add': "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
				'title': " 第三期 Beatles 02",
				'type': "1"
			},
			{
				'coverimg': "https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg",
				'description': "",
				'id': "43",
				'resource_add': "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
				'title': " 第三期 Beatles 03",
				'type': "1"
			},
			{
				'coverimg': "https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg",
				'description': "",
				'id': "44",
				'resource_add': "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
				'title': " 第三期 Beatles 04",
				'type': "1"
			},
			{
				'coverimg': "https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg",
				'description': "",
				'id': "45",
				'resource_add': "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
				'title': " 第三期 Beatles 05",
				'type': "1"
			},
		];
    const allList = [...list, ...list, ...list, ...list];
    this.setData({
      videoList: allList
    });
	},
  onPageScroll: function (event) {
    // 页面滚动时执行
    let idx = this.data.videoList.length > 10 ? this.data.videoList.length - 10 : this.data.videoList.length;
    wx.createSelectorQuery()
      .select(`#video-item${idx}`)
      .boundingClientRect( (rect)=>{
        if (rect && rect.bottom < 0) {
					if (!this.data.isRequesting) {
						console.log("loadMore------", rect);
					}
          this.loadMore();
        }
      }).exec();
    //暂停正在播放的item
    let index = this.data.videoIndex;
    if (index != null) {
      wx.createSelectorQuery()
        .select(`#video${index}`)
        .boundingClientRect(rect => {
          if (
            rect.bottom < 0 ||
            rect.top > app.globalData.systemInfo.windowHeight
          ) {
            var videoContext = wx.createVideoContext('video' + index);
            videoContext.pause();
          }
        })
        .exec();
    }
  },
	//tap切换
	onTabsItemTap: function (event) {
		let index = event.currentTarget.dataset['index'];
		this.setData({
			currentTabsIndex: index
		});
		//tab切换时停止音乐播放
		backgroundAudioManager.stop();

		//tab切换时停止视频播放
		let videoContextPrev = wx.createVideoContext('video' + this.data.videoIndex);
		videoContextPrev.stop();

		//将当前播放视频、音频的index设置为空
		this.setData({
			musicIndex: null,
			videoIndex: null,
		});
	},
	//展开
	//原本没有upStatus这个字段，所以默认值为false
	upDown(event) {
		let index = event.currentTarget.dataset['index'];
		this.data.videoList[index].upStatus = !this.data.videoList[index].upStatus;
		this.setData({
			videoList: this.data.videoList
		});
	},
	//播放音频
	musicPlay(event) {
		let src = event.currentTarget.dataset['src'];
		let index = event.currentTarget.dataset['index'];
		this.setData({
			musicIndex: index,
			audioSrc: src
		});
		
		backgroundAudioManager.src = src;
		backgroundAudioManager.play();

	},
	//停止音频
	musicPause(event) {
		this.setData({
			musicIndex: null
		});
		backgroundAudioManager.pause();
	},
	//播放视频
	videoPlay(event) {
		let length = this.data.videoList.length;
		let index = event.currentTarget.dataset['index'];

		if (!this.data.videoIndex) { // 没有播放时播放视频
			this.setData({
				videoIndex: index
			});
			let videoContext = wx.createVideoContext('video' + index);
			videoContext.play();
		} else {
			//停止正在播放的视频
			let videoContextPrev = wx.createVideoContext('video' + this.data.videoIndex);
			videoContextPrev.stop();
			//将点击视频进行播放
			this.setData({
				videoIndex: index
			});
			let videoContextCurrent = wx.createVideoContext('video' + index);
			videoContextCurrent.play();
		}
	},

	loadMore: function () {
    if (!this.data.isRequesting) {
      this.setData({
        isRequesting: true
      });
      //模拟加载数据
      let page = ++this.data.pageIndex;
			const list = [
				{
					'coverimg':"https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg",
					'description':"这是第一个示例，这是第一个示例，这是第一个示例，这是第一个示例。这是第一个示例，这是第一个示例，这是第一个示例，这是第一个示例。",
					'id':"41",
					'resource_add':"http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
					'title':" 第三期 Beatles 01",
					'type':"1"
				},
				{
					'coverimg': "https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg",
					'description': "",
					'id': "42",
					'resource_add': "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
					'title': " 第三期 Beatles 02",
					'type': "1"
				},
				{
					'coverimg': "https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg",
					'description': "",
					'id': "43",
					'resource_add': "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
					'title': " 第三期 Beatles 03",
					'type': "1"
				},
				{
					'coverimg': "https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg",
					'description': "",
					'id': "44",
					'resource_add': "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
					'title': " 第三期 Beatles 04",
					'type': "1"
				},
				{
					'coverimg': "https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg",
					'description': "",
					'id': "45",
					'resource_add': "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
					'title': " 第三期 Beatles 05",
					'type': "1"
				},
			];
			const allList = [...list, ...list, ...list, ...list];
      setTimeout( ()=>{
				console.log('loadMore: page = ' + page);
        this.setData({
          isRequesting: false,
          pageIndex: page,
          videoList: [...this.data.videoList, ...allList]
        });
      }, 2000);
    }
	}
});