webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	var BluMUI = __webpack_require__(7),
	    ReactDOM = __webpack_require__(164),
	    ajaxPading = __webpack_require__(165),
	    submitReview = document.getElementById('submitReview'),
	    view = document.getElementById('view'),
	    back = document.getElementById('back'),
	    hash = parseHash(window.location.href),
	    ViewArea = document.getElementById('viewArea'),
	    unifyCode = getCookie('userId'),
	    userName = getCookie('userName'),
	    fileURL = '',
	    courseNo = hash.classId,
	    host = courseCenter.host,
	    selectedTeachClass,
	    // 选择的教学班
	saveURL = { // save ajax url
		'课程简介': host + 'updateIntroduction',
		'实习计划': host + 'uploadTeachPlan',
		'授课计划': host + 'uploadTeachPlan',
		'学习资源': host + 'uploadLearnRes'
	},
	    deleteURL = {
		'实习计划': host + 'deleteTeachPlan',
		'授课计划': host + 'deleteTeachPlan'
	},
	    initURL = {
		'学习资源': host + 'selectLearnResType',
		'实习计划': host + 'searchJXBByCourseNo',
		'讲义': host + 'getCourseStudyResourceMsg'
	},
	    moduleNumber = {
		'考试大纲': 1,
		'导学方案': 2,
		'教学大纲': 3,
		'电子教案': 4,
		'知识体系': 5,
		'逻辑关系': 6
	},
	    sourceTypeIndex = {
		'微视频': 1,
		'讲义': 21,
		'讲义附件': 22,
		'作业': 3,
		'习（试）题库': 4,
		'网络参考资源': 5,
		'网络在线学习资源及链接': 5,
		'教材/参考书': 6
	},
	    sourceTypeState = {
		'讲义': 'jyFile',
		'作业': 'hkFile',
		'习（试）题库': 'xtFile'
	},
	    stuSourceId = {
		'微视频': 1,
		'讲义': 21,
		'讲义附件': 22,
		'作业': 3,
		'习（试）题库': 4,
		'网络参考资源': 5,
		'网络在线学习资源及链接': 5
	},
	    classNameDom = document.getElementById('courseName'),
	    deleteResourceLink = host + 'deleteResourceLink',
	    getCourseNameByNo = host + 'getCourseNameByNo',
	    getMenu = host + "subjectCenter/getMenu",
	    getCourseIntroducePageMsg = host + 'getCourseIntroducePageMsg',
	    submitOperation = host + 'submitOperation',
	    // 提交审核
	getTextbookResourceMsg = host + 'getTextbookResourceMsg',
	    // 得到参考书....
	downURL = host + 'fileDownLoad',
	    // 下载链接
	selectLearnResTypeURL = host + 'selectLearnResType',
	    queryAttachmentURL = host + 'queryAttachment',
	    // 查询电子教案、教学大纲等
	getKonwledgeSystemPageMsg = host + 'getKonwledgeSystemPageMsg',
	    // 查询知识体系
	deleteAttachment = host + 'deleteAttachment',
	    uploadJiaoAn = host + 'uploadJiaoAn',
	    picPath = host + 'upload/PIC/',
	    // 图片路径
	updataPicURL = host + 'updatePic',
	    searchJXBByCourseNo = host + 'searchJXBByCourseNo',
	    uploadBookURL = host + 'uploadBook',
	    getCourseStatus = host + 'getCourseStatus',
	    insertAttachment = host + 'insertAttachment',
	    // 保存知识体系、逻辑关系...
	uploadLearnRes = host + 'uploadLearnRes',
	    // 保存微视频...
	deleteLearnRes = host + 'deleteLearnRes',
	    // 删除微视频...
	deleteBook = host + 'deleteBook',
	    // 删除教材
	getStudyResourceMsg = host + 'getStudyResourceMsg',
	    // 获取微视频
	uploadResourceLinkURL = host + 'uploadResourceLink'; // 获取参考资源URL

	// ajax返回数据基本处理

	var handleData = function handleData(result) {
		return JSON.parse(result);
	};

	// 初始化ajax对象

	ajaxPading.init({
		type: 'post',
		dataType: 'form',
		handleData: handleData,
		name: 'saveAjax',
		async: true
	});

	// 获取模块基本信息的ajax
	ajaxPading.init({
		type: 'post',
		dataType: 'form',
		handleData: handleData,
		name: 'getMouduleInf',
		async: true
	});
	ajaxPading.init({
		type: 'post',
		dataType: 'json',
		handleData: handleData,
		name: 'getMouduleName',
		async: true
	});

	// 单独上传文件的ajax

	ajaxPading.init({
		type: 'post',
		dataType: 'form',
		name: 'file',
		handleData: handleData,
		async: true
	});

	// 通过课程ID获取课程名称
	ajaxPading.init({
		name: 'getClassName',
		type: 'post',
		dataType: 'json',
		async: true
	});

	// 删除文件的ajax
	ajaxPading.init({
		type: 'post',
		dataType: 'form',
		handleData: handleData,
		name: 'delete',
		async: true
	});

	// 切换学习资源ajax


	ajaxPading.init({
		type: 'post',
		dataType: 'json',
		handleData: handleData,
		name: 'stuSource',
		async: true
	});

	// 获取课程名称
	ajaxPading.send({
		data: {
			kcbh: courseNo
		},
		url: getCourseNameByNo,
		onSuccess: function onSuccess(result) {
			var result = JSON.parse(result),
			    data = result.data;
			if (data.length > 0) classNameDom.innerHTML = data[0].kcmc;else {
				window.location.href = 'error1.html';
			}
		},
		onFail: function onFail() {
			window.location.href = 'error1.html';
		}
	}, 'getClassName');

	//获取审核模块的详细状态

	ajaxPading.send({
		data: {
			unifyCode: {
				value: unifyCode
			},
			courseNo: {
				value: courseNo
			}
		},
		url: getCourseStatus,
		onSuccess: function onSuccess(result) {
			var meta = result.meta;
			if (meta.result == 100) {
				var data = result.data,
				    i,
				    subModulesStatus = [],
				    subModules = data.subModules,
				    len;
				for (i = 0, len = subModules.length; i < len; i++) {
					subModulesStatus.push({
						name: subModules[i].name,
						status: subModules[i].status,
						isPass: subModules[i].status == 1 || subModules[i].status == 4 ? true : false
					});
				}
				initEditorInf(subModulesStatus, data.note);
			} else {
				console.log('服务器发生错误!');
			}
		}
	}, 'getMouduleInf');

	// 处理提交ajax

	var handleSaveAjax = function handleSaveAjax(flag, result, ajaxName, postData, that) {
		var data = result.data,
		    meta = result.meta;
		if (flag == 1) {
			if (meta.result == 100) {
				switch (ajaxName) {
					case '课程简介':
						alert('保存成功!');
						break;
					case '知识体系':
					case '逻辑关系':
					case '电子教案':
					case '导学方案':
					case '考核方案':
					case '教学大纲':
					case '考试大纲':
						var items;
						if (ajaxName == '知识体系') {
							items = that.state.txItems;
							document.getElementById('warn_tx').innerHTML = '上传文件成功！';
							document.getElementById('file1').value = '';
						} else if (ajaxName == '逻辑关系') {
							items = that.state.ljItems;
							document.getElementById('file2').value = '';
							document.getElementById('warn_lj').innerHTML = '上传文件成功！';
						} else {
							items = that.state.items;
							document.getElementById('file').value = '';
							document.getElementById('warn_file').innerHTML = '上传文件成功！';
						}
						var fileName = data[0].fileName,
						    originName = data[0].originName;
						items.push([{ value: originName }, { value: '删除', fileName: fileName, callback: deleteFile }, { value: '下载', downloadName: originName, fileName: fileName, callback: downloadFile }]);
						if (ajaxName == '知识体系') {
							that.setState({
								txItems: items,
								fileName: fileName,
								isUploadTx: true
							});
						} else if (ajaxName == '逻辑关系') {
							that.setState({
								ljItems: items,
								fileName: fileName,
								isUploadLj: true
							});
						} else {
							that.setState({
								items: items,
								fileName: fileName,
								isUpload: true
							});
						}
						break;
					case '习（试）题库':
						document.getElementById('file').value = '';
						document.getElementById('warn_file').innerHTML = '上传文件成功！';
						var xtFile = that.state.xtFile,
						    fileName = data[0].fileName,
						    originName = data[0].originName;
						xtFile.push([{ value: originName }, { value: '删除', fileName: fileName, callback: deleteFile }, { value: '下载', downloadName: originName, fileName: fileName, callback: downloadFile }]);
						that.setState({
							xtFile: xtFile,
							isUpload: true
						});
						break;
					case '作业':
						document.getElementById('file').value = '';
						document.getElementById('warn_file').innerHTML = '上传文件成功！';
						var fileName = data[0].fileName,
						    originName = data[0].originName,
						    hkFile = that.state.hkFile;
						hkFile.push([{ value: originName }, { value: '删除', fileName: fileName, callback: deleteFile }, { value: '下载', downloadName: originName, fileName: fileName, callback: downloadFile }]);
						that.setState({
							hkFile: hkFile,
							isUpload: true
						});
						break;
					case '讲义':
						document.getElementById('file').value = '';
						document.getElementById('warn_file').innerHTML = '上传文件成功！';
						var jyFile = that.state.jyFile,
						    fileName = data[0].fileName,
						    originName = data[0].originName;
						jyFile.push([{ value: originName }, { value: '删除', fileName: fileName, callback: deleteFile }, { value: '下载', downloadName: originName, fileName: fileName, callback: downloadFile }]);
						that.setState({
							jyFile: jyFile,
							isUpload: true
						});
						break;
					case '讲义附件':
						document.getElementById('file1').value = '';
						document.getElementById('warn_file1').innerHTML = '上传文件成功！';
						var jyAttachment = that.state.jyAttachment,
						    fileName = data[0].fileName,
						    originName = data[0].originName;
						jyAttachment.push([{ value: originName }, { value: '删除', fileName: fileName, callback: deleteFile }, { value: '下载', downloadName: originName, fileName: fileName, callback: downloadFile }]);
						that.setState({
							jyAttachment: jyAttachment,
							isUpload1: true
						});
						break;
					case '网络参考资源':
						document.getElementById('file').value = '';
						document.getElementById('warn_file').innerHTML = '上传文件成功！';
						var onlineSource = that.state.onlineSource,
						    originName = data[0].originName,
						    fileName = data[0].fileName;
						onlineSource.push([{ value: originName }, { value: '删除', fileName: fileName, callback: deleteFile }, { value: '下载', downloadName: originName, fileName: fileName, callback: downloadFile }]);
						that.setState({
							onlineSource: onlineSource,
							isUpload: true
						});
						break;
					case '微视频':
						document.getElementById('file').value = '';
						document.getElementById('warn_file').innerHTML = '上传视频成功！';
						var videos = that.state.videos;
						console.log(result);
						videos.push({
							img: '#',
							name: data[0].originName,
							zjr: postData.speaker.value,
							fileName: data[0].fileName
						});
						that.setState({
							videos: videos,
							isUpload: true
						});
						break;
					case '其他微视频':
						var otherVideo = that.state.otherVideo;
						otherVideo.push([{ value: postData.linkName.value, url: postData.linkURL.value }, { value: '删除', callback: deleteFile, linkURL: postData.linkURL.value, linkName: postData.linkName.value }]);
						that.setState({
							otherVideo: otherVideo
						});
						break;
					case '网络学习资源URL':
						var onlineURL = that.state.onlineURL;
						onlineURL.push([{ value: postData.linkName.value, url: postData.linkURL.value }, { value: '删除', callback: deleteFile, linkURL: postData.linkURL.value, linkName: postData.linkName.value }]);
						that.setState({
							onlineURL: onlineURL
						});
						break;
					case '参考书':
					case '教材':
						if (ajaxName == '教材') {
							var items = that.state.jcBooks;
						} else {
							items = that.state.ckBooks;
						}
						items.push({
							img: picPath + data.picURL,
							bookName: postData.bookName.value,
							author: postData.author.value,
							publisher: postData.press.value,
							bookId: data.bookID
						});
						if (ajaxName == '教材') {
							that.setState({
								jcBooks: items,
								addBox: false,
								fileName: ''
							});
						} else {
							that.setState({
								ckBooks: items,
								addBox: false,
								fileName: ''
							});
						}
						break;
				}
			} else {
				if (ajaxName == '知识体系') {
					document.getElementById('warn_tx').innerHTML = '上传文件失败';
					that.setState({
						isUploadTx: true
					});
				} else if (ajaxName == '逻辑关系') {
					document.getElementById('warn_lj').innerHTML = '上传文件失败';
					that.setState({
						isUploadLj: true
					});
				} else if (ajaxName == "参考书" || ajaxName == "教材") {
					document.getElementById('warn_picName').innerHTML = '上传文件失败';
				} else if (ajaxName == '其他微视频') {
					if (meta.result == 202) {
						document.getElementById('warn_speaker2').innerHTML = '资源已存在';
						document.getElementById('warn_linkName').innerHTML = '资源已存在';
						document.getElementById('warn_linkURL').innerHTML = '资源已存在';
					} else {
						document.getElementById('warn_speaker2').innerHTML = '上传文件失败';
						document.getElementById('warn_linkURL').innerHTML = '上传文件失败';
						document.getElementById('warn_linkName').innerHTML = '上传文件失败';
					}
				} else if (ajaxName == '网络学习资源URL') {
					if (meta.result == 202) {
						document.getElementById('warn_linkName').innerHTML = '资源已存在';
						document.getElementById('warn_linkURL').innerHTML = '资源已存在';
					} else {
						document.getElementById('warn_linkURL').innerHTML = '上传文件失败';
						document.getElementById('warn_linkName').innerHTML = '上传文件失败';
					}
				} else if (ajaxName == '讲义附件') {
					that.setState({
						isUpload1: true
					});
					document.getElementById('warn_file1').innerHTML = '上传文件失败';
				} else {
					that.setState({
						isUpload: true
					});
					document.getElementById('warn_file').innerHTML = '上传文件失败';
				}
			}
		} else {
			switch (ajaxName) {
				case '课程简介':
					console.log('请检查网络!');
					break;
				case '知识体系':
					that.setState({
						isUpload: true
					});
					document.getElementById('warn_tx').innerHTML = '上传文件失败';
				case '逻辑关系':
					that.setState({
						isUpload: true
					});
					document.getElementById('warn_lj').innerHTML = '上传文件失败';
				case '网络学习资源URL':
				case '其他微视频':
					break;
				case '讲义附件':
					that.setState({
						isUpload1: true
					});
					document.getElementById('warn_file1').innerHTML = '上传文件失败';
					break;
				default:
					that.setState({
						isUpload: true
					});
					document.getElementById('warn_file').innerHTML = '上传文件失败';
					break;
			}
		}
	};

	// ajax Save
	var saveAjax = function saveAjax(data, ajaxName, that) {
		var fail = null,
		    success = null,
		    check = null,
		    start = null,
		    url = saveURL[ajaxName];

		data.unifyCode = {
			value: unifyCode
		};
		data.courseNo = {
			value: courseNo
		};
		switch (ajaxName) {
			case '课程简介':
				fail = function fail(result) {
					handleSaveAjax(0, result, ajaxName, data, that);
				};
				success = function success(result) {

					handleSaveAjax(1, result, ajaxName, data, that);
				};
				check = function check(checkInfs) {
					var i,
					    type,
					    id = '',
					    checkInf = null,
					    len;
					for (i = 0, len = checkInfs.length; i < len; i++) {
						checkInf = checkInfs[i];
						type = checkInf.type;
						id = 'warn_' + type;
						if (!checkInf.isCheck) {
							if (type == 'picName') document.getElementById(id).innerHTML = '未选择封面';else document.getElementById(id).innerHTML = '未填写课程简介';
						} else document.getElementById(id).innerHTML = '';
					}
				};
				break;
			case '知识体系':
			case '逻辑关系':
			case '电子教案':
			case '导学方案':
			case '考核方案':
			case '教学大纲':
			case '考试大纲':
				url = insertAttachment;
				data.type = {
					value: moduleNumber[ajaxName]
				};
				start = function start() {
					if (ajaxName == '知识体系') {
						that.setState({
							isUploadTx: false
						});
					} else if (ajaxName == '逻辑关系') {
						that.setState({
							isUploadLj: false
						});
					} else {
						that.setState({
							isUpload: false
						});
					}
				};
				success = function success(result) {
					handleSaveAjax(1, result, ajaxName, data, that);
				};
				fail = function fail(result) {
					handleSaveAjax(0, result, ajaxName, data, that);
				};
				check = function check(checkInfs) {
					var errorInf = checkInfs[0].errorInf || '',
					    type = checkInfs[0].type,
					    isCheck = checkInfs[0].isCheck;
					if (!isCheck) document.getElementById('warn_' + type).innerHTML = errorInf;else document.getElementById('warn_' + type).innerHTML = '正在上传文件...';
				};
				break;
			case '微视频':
			case '网络参考资源':
			case '习（试）题库':
			case '作业':
			case '讲义附件':
			case '讲义':
				data.ID = {
					value: stuSourceId[ajaxName]
				};
				console.log(ajaxName);
				url = uploadLearnRes;
				success = function success(result) {
					handleSaveAjax(1, result, ajaxName, data, that);
				};
				start = function start() {
					if (ajaxName == '讲义附件') {
						that.setState({
							isUpload1: false
						});
					} else {
						that.setState({
							isUpload: false
						});
					}
				};
				check = function check(checkInfs) {
					var checkInf = checkInfs[0],
					    isCheck = checkInf.isCheck,
					    errorInf = checkInf.errorInf,
					    type = checkInf.type;
					if (!isCheck) document.getElementById('warn_' + type).innerHTML = errorInf;else document.getElementById('warn_' + type).innerHTML = '正在上传文件...';
				};
				fail = function fail(result) {
					handleSaveAjax(0, result, ajaxName, data, that);
				};
				break;
			case '其他微视频':
			case '网络学习资源URL':
				if (ajaxName == '其他微视频') {
					data.ID = {
						value: 1
					};
				} else {
					data.ID = {
						value: 5
					};
				}
				url = uploadResourceLinkURL;
				check = function check(checkInfs) {
					var i, len, checkInf;
					for (i = 0, len = checkInfs.length; checkInf = checkInfs[i]; i++) {
						if (!checkInf.isCheck) {
							document.getElementById('warn_' + checkInf.type).innerHTML = checkInf.errorInf;
						} else {
							document.getElementById('warn_' + checkInf.type).innerHTML = '';
						}
					}
				};
				success = function success(result) {
					handleSaveAjax(1, result, ajaxName, data, that);
					that.setState({
						addBox: false
					});
				};
				break;
			case '参考书':
			case '教材':
				url = uploadBookURL;
				success = function success(result) {
					handleSaveAjax(1, result, ajaxName, data, that);
				};
				check = function check(checkInfs) {
					var i, len, checkInf;
					for (i = 0, len = checkInfs.length; checkInf = checkInfs[i]; i++) {
						if (!checkInf.isCheck) {
							document.getElementById('warn_' + checkInf.type).innerHTML = checkInf.errorInf;
						} else {
							document.getElementById('warn_' + checkInf.type).innerHTML = '';
						}
					}
				};
				break;

			default:
				break;
		}
		console.log(5324234, data);
		ajaxPading.send({
			data: data,
			url: url,
			onFail: fail,
			onSuccess: success,
			onCheck: check,
			onStart: start
		}, 'saveAjax', that);
	};

	// upload File
	var uploadFile = function uploadFile(fileData, dataType, img, that) {
		if (dataType == 'Itru' || dataType == 'teachBook') {
			ajaxPading.send({
				data: {
					unifyCode: {
						value: unifyCode
					},
					file: {
						value: fileData,
						type: 'picName',
						suffix: ['jpg', 'png', 'jpeg', 'gif', 'psd']
					}
				},
				url: updataPicURL,
				onCheck: function onCheck(checkInfs) {
					var checkInf = checkInfs[0],
					    type = checkInf.type,
					    isCheck = checkInf.isCheck;
					if (!isCheck) document.getElementById('warn_' + type).innerHTML = '封面图片格式错误!';else document.getElementById('warn_' + type).innerHTML = '正在上传封面';
				},
				onSuccess: function onSuccess(result) {
					if (result.meta.result == 100) {
						var fileName = result.data.fileName;
						that.state.fileName = fileName;
						img.src = picPath + fileName;
						document.getElementById('warn_picName').innerHTML = '上传成功!';
					} else {
						console.log('文件上传失败!');
					}
				}
			}, 'file');
		}
	};

	// delete File,type 1 为删除list的item, 0 为删除table的item
	var deleteFile = function deleteFile(ajaxName, index, that, type, items) {
		var url = deleteURL[ajaxName],
		    data = {
			unifyCode: {
				value: unifyCode
			},
			courseNo: {
				value: courseNo
			},
			fileName: {
				value: items[index].fileName
			}
		};
		switch (ajaxName) {
			case '授课计划':
			case '实习计划':
				data.teachClass = {
					value: selectedTeachClass,
					pattern: /.{1,}/
				};
				break;
			case '其他微视频':
			case '网络学习资源URL':
				url = deleteResourceLink;
				if (ajaxName == '网络学习资源URL') {
					data.ID = {
						value: 5
					};
				} else {
					data.ID = {
						value: 1
					};
				}
				data.linkURL = {
					value: items[index].linkURL
				};
				data.linkName = {
					value: items[index].linkName
				};
				break;
			case '网络参考资源':
			case '习（试）题库':
			case '作业':
			case '讲义':
			case '讲义附件':
			case '微视频':
				url = deleteLearnRes;
				data.ID = {
					value: sourceTypeIndex[ajaxName]
				};
				console.log(data);
				break;
			case '参考书':
			case '教材':
				url = deleteBook;
				data.bookID = {
					value: items[index].bookId
				};

				break;
			case '逻辑关系':
			case '知识体系':
			case '教学大纲':
			case '考试大纲':
			case '电子教案':
			case '导学方案':
				url = deleteAttachment;
				data.type = {
					value: moduleNumber[ajaxName]
				};
				break;
			default:
				break;
		}
		switch (type) {
			case 0:
				ajaxPading.send({
					data: data,
					url: url,
					onSuccess: function onSuccess(result) {
						if (result.meta.result == 100) {
							items.splice(index, 1);
							that.setState({
								items: items
							});
						} else {
							alert(result.meta.msg);
						}
					},
					onFail: function onFail() {
						alert('请检查您的网络');
					}
				}, 'delete');
				break;
			case 1:
				ajaxPading.send({
					data: data,
					url: url,
					onSuccess: function onSuccess(result) {
						if (result.meta.result == 100) {
							items.splice(0, 3);
							that.setState({
								items: items
							});
						} else {
							alert(result.meta.msg);
						}
					},
					onFail: function onFail() {}
				}, 'delete');
				break;
			case 2:
				// 删除微视频、教材/参考书籍
				ajaxPading.send({
					data: data,
					url: url,
					onSuccess: function onSuccess(result) {
						if (result.meta.result == 100) {
							items.splice(index, 1);
							if (ajaxName == '微视频') that.setState({
								videos: items
							});
							if (ajaxName == '教材') {
								that.setState({
									jcBooks: items
								});
							}
							if (ajaxName == '参考书') {
								that.setState({
									ckBooks: items
								});
							}
						} else {
							alert(result.meta.msg);
						}
					},
					onFail: function onFail() {
						alert('请检查您的网络');
					}
				}, 'delete');
				break;
		}
	};

	// download File

	var downloadFile = function downloadFile(ajaxName, index, that, type, items) {

		var fileName = items[index].fileName,
		    downloadName = items[index].downloadName,
		    downLoadIframes = window.frames['downLoad'];
		downLoadIframes.location.href = downURL + '?name=' + downloadName + '&oName=' + fileName;
	};

	// 处理切换模块的数据

	var handleChangeModuleData = function handleChangeModuleData(result, moduleName, that) {
		var meta = result.meta,
		    data = result.data || [],
		    i,
		    len,
		    items;
		if (meta.result == 100) {
			switch (moduleName) {
				case '课程简介':
					that.tpurl = picPath + data[0].tpurl;
					that.html = data[0].kcjshtml;
					that.fileName = data[0].tpurl;
					break;
				case '教学大纲':
				case '考试大纲':
				case '导学方案':
				case '电子教案':
				case '考核方案':
					items = [];
					var list = data.list;
					for (i = 0, len = list.length; i < len; i++) {
						items[i] = [{ value: list[i].originName }, { value: '删除', fileName: list[i].fileName, callback: deleteFile }, { value: '下载', downloadName: moduleName + (i + 1), fileName: list[i].fileName, callback: downloadFile }];
					}
					that.items = items;
					that.isUpload = true;
					break;
				case '知识体系':
					var ljItems = [],
					    txItems = [],
					    list = data.list,
					    logicList = data.logicList;
					for (i = 0, len = list.length; i < len; i++) {
						txItems[i] = [{ value: list[i].originName }, { value: '删除', fileName: list[i].fileName, callback: deleteFile }, { value: '下载', downloadName: moduleName + (i + 1), fileName: list[i].fileName, callback: downloadFile }];
					}
					for (i = 0, len = logicList.length; i < len; i++) {
						ljItems[i] = [{ value: logicList[i].originName }, { value: '删除', fileName: logicList[i].fileName, callback: deleteFile }, { value: '下载', downloadName: moduleName + (i + 1), fileName: logicList[i].fileName, callback: downloadFile }];
					}

					that.txItems = txItems;
					that.ljItems = ljItems;
					that.isUploadTx = true;
					that.isUploadLj = true;
					break;
				case '实习计划':
				case '授课计划':
					items = [];
					for (i = 0, len = data.length; i < len; i++) {
						items[i] = [{ value: data[i].JXB + '-' + moduleName }, { value: '下载', downloadName: data[i].JXB + '-' + moduleName, fileName: data[i].url, callback: downloadFile }];
					}
					that.items = items;
					that.isUpload = true;
					break;
				case '学习资源':
					items = [];
					for (i = 0, len = data.length; i < len; i++) {
						items.push(data[i].lxmc);
					}
					that.drops[0].items = items;
					that.drops[0].initalSelected = "微视频";
					ajaxPading.send({
						data: {
							kcbh: courseNo,
							zylb: 1,
							unifyCode: unifyCode,
							place: 1
						},
						url: getStudyResourceMsg,
						onSuccess: function onSuccess(result) {
							var meta = result.meta;
							if (meta.result == 100) {
								var data = result.data || [],
								    videos = [],
								    otherVideo = [],
								    i,
								    len;
								for (i = 0, len = data.length; i < len; i++) {
									if (data[i].wlxxzylj == "") {
										videos.push({
											img: '#',
											name: data[i].ywjm,
											zjr: data[i].zjr,
											fileName: data[i].xywjm
										});
									} else {
										otherVideo.push([{
											value: data[i].ljmc,
											url: data[i].wlxxzylj
										}, {
											value: '删除',
											callback: deleteFile,
											linkURL: data[i].wlxxzylj,
											linkName: data[i].ljmc
										}]);
									}
								}
								BluMUI.result.stuSource.setState({
									videos: videos,
									otherVideo: otherVideo
								});
							}
						}
					}, 'stuSource');
					break;
			}
		} else {
			console.log('数据处理失败!');
		}
	};

	// 切换模块
	var changeMoudule = function changeMoudule(ajaxName, index, that, type, items) {
		var mouduleName = items[index].value,
		    url,
		    success = null,
		    data = null;
		url = initURL[mouduleName];
		ReactDOM.unmountComponentAtNode(ViewArea);
		switch (mouduleName) {
			case '知识体系':
			case '考核方案':
			case '逻辑关系':
			case '电子教案':
			case '教学大纲':
			case '导学方案':
			case '考试大纲':
				url = queryAttachmentURL;
				data = {
					courseNo: {
						value: courseNo
					},
					unifyCode: {
						value: unifyCode
					},
					type: {
						value: moduleNumber[mouduleName]
					},
					place: {
						value: 1
					}
				};
				success = function success(result) {
					handleChangeModuleData(result, mouduleName, selects[mouduleName].componentInf);
					BluMUI.create(selects[mouduleName].componentInf, selects[mouduleName].type, ViewArea, selects[mouduleName].callback);
				};
				break;
			case '学习资源':
				url = selectLearnResTypeURL;
				data = {
					kcbh: {
						value: courseNo
					},
					zylb: {
						value: sourceTypeIndex[mouduleName]
					},
					unifyCode: {
						value: unifyCode
					}
				};
				success = function success(result) {
					handleChangeModuleData(result, mouduleName, selects[mouduleName].componentInf);
					BluMUI.create(selects[mouduleName].componentInf, selects[mouduleName].type, ViewArea, selects[mouduleName].callback);
				};
				break;
			case '课程简介':
				url = getCourseIntroducePageMsg;
				data = {
					kcbh: {
						value: courseNo
					},
					unifyCode: {
						value: unifyCode
					},
					place: {
						value: 1
					}
				};
				success = function success(result) {
					handleChangeModuleData(result, mouduleName, selects[mouduleName].componentInf);
					BluMUI.create(selects[mouduleName].componentInf, selects[mouduleName].type, ViewArea, selects[mouduleName].callback);
				};
				break;
			default:
				BluMUI.create(selects[mouduleName].componentInf, selects[mouduleName].type, ViewArea, selects[mouduleName].callback);
				break;
		}
		if (data != null) {
			ajaxPading.send({
				data: data,
				url: url,
				onSuccess: success
			}, 'getMouduleInf');
		}
	};

	// 切换资源类型

	var selectSourceType = function selectSourceType(value) {
		var that = BluMUI.result.stuSource,
		    url,
		    fail = null,
		    success = null,
		    data = {
			kcbh: courseNo,
			zylb: sourceTypeIndex[value],
			unifyCode: unifyCode,
			place: 1
		};
		switch (value) {
			case '网络在线学习资源及链接':
			case '微视频':
				url = getStudyResourceMsg;
				success = function success(result) {
					var meta = result.meta;
					if (meta.result == 100) {
						var data = result.data || [],
						    localResourse = [],
						    thirdOfferResource = [],
						    i,
						    len;
						for (i = 0, len = data.length; i < len; i++) {
							if (data[i].wlxxzylj == "") {
								if (value == '微视频') {
									localResourse.push({
										img: '#',
										name: data[i].ymjm,
										fileName: data[i].xywjm
									});
								} else {
									localResourse.push([{ value: data[i].ywjm }, { value: '删除', callback: deleteFile, fileName: data[i].xywjm }, { value: '下载', downloadName: data[i].sfnxz, fileName: data[i].xywjm, callback: downloadFile }]);
								}
							} else {
								thirdOfferResource.push([{ value: data[i].ljmc }, {
									value: '删除',
									callback: deleteFile,
									linkURL: data[i].wlxxzylj,
									linkName: data[i].ljmc
								}]);
							}
						}
						if (value == '微视频') {
							that.setState({
								videos: localResourse,
								otherVideo: thirdOfferResource,
								sourceType: value,
								isUpload: true
							});
						} else {
							that.setState({
								onlineSource: localResourse,
								onlineURL: thirdOfferResource,
								sourceType: value,
								isUpload: true
							});
						}
					} else {
						that.setState({
							sourceType: value,
							isUpload: true
						});
					}
				};
				break;
			case '讲义':
				data.zylb = 2;
				url = getStudyResourceMsg;
				success = function success(result) {
					var meta = result.meta,
					    warn = document.getElementById('warn_file');
					if (warn) warn.innerHTML = '未选择文件!';
					if (meta.result == 100) {
						var items = [],
						    items1 = [],
						    data = result.data || [],
						    i,
						    result = {},
						    len;
						for (i = 0, len = data.length; i < len; i++) {
							if (data[i].zylb == 22) {
								items1.push([{ value: data[i].ywjm }, { value: '删除', callback: deleteFile, fileName: data[i].xywjm }, { value: '下载', downloadName: data[i].sfnxz, fileName: data[i].xywjm, callback: downloadFile }]);
							} else if (data[i].zylb == 21) {
								items.push([{ value: data[i].ywjm }, { value: '删除', callback: deleteFile, fileName: data[i].xywjm }, { value: '下载', downloadName: data[i].sfnxz, fileName: data[i].xywjm, callback: downloadFile }]);
							}
						}
						result.isUpload = true;
						result.isUpload1 = true;
						result.sourceType = value;
						result.jyFile = items;
						result.jyAttachment = items1;
						that.setState(result);
					} else {
						that.setState({
							sourceType: value,
							isUpload: true
						});
					}
				};
				fail = function fail(result) {};
				break;
			case '作业':
			case '习（试）题库':
				url = getStudyResourceMsg;
				success = function success(result) {
					var meta = result.meta,
					    warn = document.getElementById('warn_file');
					if (warn) warn.innerHTML = '未选择文件!';
					if (meta.result == 100) {
						var items = [],
						    data = result.data || [],
						    i,
						    result = {},
						    len;
						for (i = 0, len = data.length; i < len; i++) {
							items.push([{ value: data[i].ywjm }, { value: '删除', callback: deleteFile, fileName: data[i].xywjm }, { value: '下载', downloadName: data[i].sfnxz, fileName: data[i].xywjm, callback: downloadFile }]);
						}
						result.isUpload = true;
						result.sourceType = value;
						result[sourceTypeState[value]] = items;
						that.setState(result);
					} else {
						that.setState({
							sourceType: value,
							isUpload: true
						});
					}
				};
				fail = function fail(result) {};
				break;
			case '教材/参考书':
				url = getTextbookResourceMsg;
				success = function success(result) {
					var meta = result.meta;
					if (meta.result == 100) {
						var data = result.data || [],
						    jcBooks = [],
						    ckBooks = [],
						    teachBookList = data.teachBookList,
						    referenceBookList = data.referenceBookList,
						    i,
						    len;;
						for (i = 0, len = teachBookList.length; i < len; i++) {
							jcBooks.push({
								img: picPath + teachBookList[i].tpmc,
								bookName: teachBookList[i].sm,
								author: teachBookList[i].zz,
								publisher: teachBookList[i].CBS,
								bookId: teachBookList[i].id
							});
						}
						for (i = 0, len = referenceBookList.length; i < len; i++) {
							ckBooks.push({
								img: picPath + referenceBookList[i].tpmc,
								bookName: referenceBookList[i].sm,
								author: referenceBookList[i].zz,
								publisher: referenceBookList[i].CBS,
								bookId: referenceBookList[i].id
							});
						}
						that.setState({
							jcBooks: jcBooks,
							ckBooks: ckBooks,
							sourceType: value
						});
					} else {
						that.setState({
							sourceType: value
						});
					}
				};
				fail = function fail() {};
				break;
		}
		ajaxPading.send({
			data: data,
			url: url,
			onSuccess: success,
			onFail: fail
		}, 'stuSource');
	};

	// 初始化课程维护

	var initEditorInf = function initEditorInf(inf, notes) {
		var i,
		    len,
		    moudleItems = [],
		    status = [[], [], [], []];
		for (i = 0, len = inf.length; i < len; i++) {
			status[inf[i].status - 1].push(inf[i].name);
			moudleItems.push({ value: inf[i].name, callback: changeMoudule });
			if (selects[inf[i].name]) selects[inf[i].name].componentInf.isPass = inf[i].isPass;
		}
		BluMUI.create({
			noSubmit: status[0],
			noReviewCourse: status[1],
			passCourse: status[2],
			rejectCourse: status[3],
			notes: notes || []
		}, 'CourseStatus', document.getElementById('courseStatus'));
		ajaxPading.send({
			url: getCourseIntroducePageMsg,
			data: {
				kcbh: {
					value: courseNo
				},
				unifyCode: {
					value: unifyCode
				},
				place: {
					value: 1
				}
			},
			onSuccess: function onSuccess(result) {
				var data = result.data || [],
				    meta = result.meta;
				selects['课程简介'].componentInf.html = data[0].kcjshtml;
				selects['课程简介'].componentInf.tpurl = picPath + data[0].tpurl;
				selects['课程简介'].componentInf.fileName = data[0].tpurl;
				BluMUI.create(selects['课程简介'].componentInf, selects['课程简介'].type, ViewArea, selects['课程简介'].callback);
			}
		}, 'getMouduleInf');
		BluMUI.create({
			id: 'contentNav',
			extClass: '',
			items: moudleItems,
			index: 0
		}, 'List', document.getElementById('nav'));
	};

	// 模块数据
	var selects = {
		'课程简介': {
			componentInf: {
				id: 'intro',
				isPass: true,
				fileURL: fileURL,
				unifyCode: unifyCode,
				ajaxName: '课程简介',
				saveAjax: saveAjax,
				uploadFile: uploadFile
			},
			type: 'ClassItru'
		},
		'教学大纲': {
			componentInf: {
				id: 'AssessmentScheme',
				isPass: true,
				title: '教学大纲',
				fileFormName: 'file',
				ajaxName: '教学大纲',
				items: [],
				saveAjax: saveAjax
			},
			type: 'AssessmentScheme'
		},
		'考试大纲': {
			componentInf: {
				id: 'AssessmentScheme',
				isPass: true,
				title: '考试大纲',
				ajaxName: '考试大纲',
				fileFormName: 'file',
				items: [],
				saveAjax: saveAjax
			},
			type: 'AssessmentScheme'
		},
		'电子教案': {
			componentInf: {
				id: 'AssessmentScheme',
				isPass: true,
				title: '电子教案',
				ajaxName: '电子教案',
				fileURL: fileURL,
				fileFormName: 'file',
				items: [],
				saveAjax: saveAjax
			},
			type: 'AssessmentScheme'
		},
		'知识体系': {
			componentInf: {
				id: 'KnowledgeSystem',
				isPass: true,
				title: '知识体系',
				ajaxName: '知识体系',
				fileURL: fileURL,
				txItems: [],
				ljItems: [],
				saveAjax: saveAjax
			},
			type: 'KnowledgeSystem'
		},
		'学习资源': {
			componentInf: {
				id: 'stuSource',
				isPass: true,
				title: '微视频',
				fileURL: fileURL,
				fileFormName: 'file',
				ajaxName: '学习资源',
				drops: [{
					id: 'soureTypeWarp',
					name: 'soureType',
					callback: selectSourceType
				}],
				videos: [],
				onlineSource: [],
				onlineURL: [],
				jcBooks: [],
				ckBooks: [],
				jyFile: [],
				jyAttachment: [],
				hkFile: [],
				xtFile: [],
				otherVideo: [],
				uploadFile: uploadFile,
				saveAjax: saveAjax,
				deleteFile: deleteFile
			},
			type: 'StudySource'
		},
		'导学方案': {
			componentInf: {
				id: 'AssessmentScheme',
				isPass: true,
				title: '导学方案',
				ajaxName: '导学方案',
				fileURL: fileURL,
				fileFormName: 'file',
				items: [],
				saveAjax: saveAjax
			},
			type: 'AssessmentScheme'
		}
	};
	view.onclick = function () {
		window.open('../classInfShow/classInfReview.html?classId=' + courseNo);
	};
	back.onclick = function () {
		window.location.href = 'courseManagement.html';
	};

/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * https://github.com/es-shims/es5-shim
	 * @license es5-shim Copyright 2009-2015 by contributors, MIT License
	 * see https://github.com/es-shims/es5-shim/blob/master/LICENSE
	 */

	// vim: ts=4 sts=4 sw=4 expandtab

	// Add semicolon to prevent IIFE from being passed as argument to concatenated code.
	;

	// UMD (Universal Module Definition)
	// see https://github.com/umdjs/umd/blob/master/templates/returnExports.js
	(function (root, factory) {
	    'use strict';

	    /* global define, exports, module */
	    if (true) {
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        // Node. Does not work with strict CommonJS, but
	        // only CommonJS-like enviroments that support module.exports,
	        // like Node.
	        module.exports = factory();
	    } else {
	        // Browser globals (root is window)
	        root.returnExports = factory();
	    }
	}(this, function () {
	    /**
	     * Brings an environment as close to ECMAScript 5 compliance
	     * as is possible with the facilities of erstwhile engines.
	     *
	     * Annotated ES5: http://es5.github.com/ (specific links below)
	     * ES5 Spec: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf
	     * Required reading: http://javascriptweblog.wordpress.com/2011/12/05/extending-javascript-natives/
	     */

	    // Shortcut to an often accessed properties, in order to avoid multiple
	    // dereference that costs universally. This also holds a reference to known-good
	    // functions.
	    var $Array = Array;
	    var ArrayPrototype = $Array.prototype;
	    var $Object = Object;
	    var ObjectPrototype = $Object.prototype;
	    var $Function = Function;
	    var FunctionPrototype = $Function.prototype;
	    var $String = String;
	    var StringPrototype = $String.prototype;
	    var $Number = Number;
	    var NumberPrototype = $Number.prototype;
	    var array_slice = ArrayPrototype.slice;
	    var array_splice = ArrayPrototype.splice;
	    var array_push = ArrayPrototype.push;
	    var array_unshift = ArrayPrototype.unshift;
	    var array_concat = ArrayPrototype.concat;
	    var array_join = ArrayPrototype.join;
	    var call = FunctionPrototype.call;
	    var apply = FunctionPrototype.apply;
	    var max = Math.max;
	    var min = Math.min;

	    // Having a toString local variable name breaks in Opera so use to_string.
	    var to_string = ObjectPrototype.toString;

	    /* global Symbol */
	    /* eslint-disable one-var-declaration-per-line, no-redeclare, max-statements-per-line */
	    var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
	    var isCallable; /* inlined from https://npmjs.com/is-callable */ var fnToStr = Function.prototype.toString, constructorRegex = /^\s*class /, isES6ClassFn = function isES6ClassFn(value) { try { var fnStr = fnToStr.call(value); var singleStripped = fnStr.replace(/\/\/.*\n/g, ''); var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, ''); var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' '); return constructorRegex.test(spaceStripped); } catch (e) { return false; /* not a function */ } }, tryFunctionObject = function tryFunctionObject(value) { try { if (isES6ClassFn(value)) { return false; } fnToStr.call(value); return true; } catch (e) { return false; } }, fnClass = '[object Function]', genClass = '[object GeneratorFunction]', isCallable = function isCallable(value) { if (!value) { return false; } if (typeof value !== 'function' && typeof value !== 'object') { return false; } if (hasToStringTag) { return tryFunctionObject(value); } if (isES6ClassFn(value)) { return false; } var strClass = to_string.call(value); return strClass === fnClass || strClass === genClass; };

	    var isRegex; /* inlined from https://npmjs.com/is-regex */ var regexExec = RegExp.prototype.exec, tryRegexExec = function tryRegexExec(value) { try { regexExec.call(value); return true; } catch (e) { return false; } }, regexClass = '[object RegExp]'; isRegex = function isRegex(value) { if (typeof value !== 'object') { return false; } return hasToStringTag ? tryRegexExec(value) : to_string.call(value) === regexClass; };
	    var isString; /* inlined from https://npmjs.com/is-string */ var strValue = String.prototype.valueOf, tryStringObject = function tryStringObject(value) { try { strValue.call(value); return true; } catch (e) { return false; } }, stringClass = '[object String]'; isString = function isString(value) { if (typeof value === 'string') { return true; } if (typeof value !== 'object') { return false; } return hasToStringTag ? tryStringObject(value) : to_string.call(value) === stringClass; };
	    /* eslint-enable one-var-declaration-per-line, no-redeclare, max-statements-per-line */

	    /* inlined from http://npmjs.com/define-properties */
	    var supportsDescriptors = $Object.defineProperty && (function () {
	        try {
	            var obj = {};
	            $Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
	            for (var _ in obj) { // jscs:ignore disallowUnusedVariables
	                return false;
	            }
	            return obj.x === obj;
	        } catch (e) { /* this is ES3 */
	            return false;
	        }
	    }());
	    var defineProperties = (function (has) {
	        // Define configurable, writable, and non-enumerable props
	        // if they don't exist.
	        var defineProperty;
	        if (supportsDescriptors) {
	            defineProperty = function (object, name, method, forceAssign) {
	                if (!forceAssign && (name in object)) {
	                    return;
	                }
	                $Object.defineProperty(object, name, {
	                    configurable: true,
	                    enumerable: false,
	                    writable: true,
	                    value: method
	                });
	            };
	        } else {
	            defineProperty = function (object, name, method, forceAssign) {
	                if (!forceAssign && (name in object)) {
	                    return;
	                }
	                object[name] = method;
	            };
	        }
	        return function defineProperties(object, map, forceAssign) {
	            for (var name in map) {
	                if (has.call(map, name)) {
	                    defineProperty(object, name, map[name], forceAssign);
	                }
	            }
	        };
	    }(ObjectPrototype.hasOwnProperty));

	    //
	    // Util
	    // ======
	    //

	    /* replaceable with https://npmjs.com/package/es-abstract /helpers/isPrimitive */
	    var isPrimitive = function isPrimitive(input) {
	        var type = typeof input;
	        return input === null || (type !== 'object' && type !== 'function');
	    };

	    var isActualNaN = $Number.isNaN || function isActualNaN(x) {
	        return x !== x;
	    };

	    var ES = {
	        // ES5 9.4
	        // http://es5.github.com/#x9.4
	        // http://jsperf.com/to-integer
	        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToInteger */
	        ToInteger: function ToInteger(num) {
	            var n = +num;
	            if (isActualNaN(n)) {
	                n = 0;
	            } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
	                n = (n > 0 || -1) * Math.floor(Math.abs(n));
	            }
	            return n;
	        },

	        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToPrimitive */
	        ToPrimitive: function ToPrimitive(input) {
	            var val, valueOf, toStr;
	            if (isPrimitive(input)) {
	                return input;
	            }
	            valueOf = input.valueOf;
	            if (isCallable(valueOf)) {
	                val = valueOf.call(input);
	                if (isPrimitive(val)) {
	                    return val;
	                }
	            }
	            toStr = input.toString;
	            if (isCallable(toStr)) {
	                val = toStr.call(input);
	                if (isPrimitive(val)) {
	                    return val;
	                }
	            }
	            throw new TypeError();
	        },

	        // ES5 9.9
	        // http://es5.github.com/#x9.9
	        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToObject */
	        ToObject: function (o) {
	            if (o == null) { // this matches both null and undefined
	                throw new TypeError("can't convert " + o + ' to object');
	            }
	            return $Object(o);
	        },

	        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToUint32 */
	        ToUint32: function ToUint32(x) {
	            return x >>> 0;
	        }
	    };

	    //
	    // Function
	    // ========
	    //

	    // ES-5 15.3.4.5
	    // http://es5.github.com/#x15.3.4.5

	    var Empty = function Empty() {};

	    defineProperties(FunctionPrototype, {
	        bind: function bind(that) { // .length is 1
	            // 1. Let Target be the this value.
	            var target = this;
	            // 2. If IsCallable(Target) is false, throw a TypeError exception.
	            if (!isCallable(target)) {
	                throw new TypeError('Function.prototype.bind called on incompatible ' + target);
	            }
	            // 3. Let A be a new (possibly empty) internal list of all of the
	            //   argument values provided after thisArg (arg1, arg2 etc), in order.
	            // XXX slicedArgs will stand in for "A" if used
	            var args = array_slice.call(arguments, 1); // for normal call
	            // 4. Let F be a new native ECMAScript object.
	            // 11. Set the [[Prototype]] internal property of F to the standard
	            //   built-in Function prototype object as specified in 15.3.3.1.
	            // 12. Set the [[Call]] internal property of F as described in
	            //   15.3.4.5.1.
	            // 13. Set the [[Construct]] internal property of F as described in
	            //   15.3.4.5.2.
	            // 14. Set the [[HasInstance]] internal property of F as described in
	            //   15.3.4.5.3.
	            var bound;
	            var binder = function () {

	                if (this instanceof bound) {
	                    // 15.3.4.5.2 [[Construct]]
	                    // When the [[Construct]] internal method of a function object,
	                    // F that was created using the bind function is called with a
	                    // list of arguments ExtraArgs, the following steps are taken:
	                    // 1. Let target be the value of F's [[TargetFunction]]
	                    //   internal property.
	                    // 2. If target has no [[Construct]] internal method, a
	                    //   TypeError exception is thrown.
	                    // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
	                    //   property.
	                    // 4. Let args be a new list containing the same values as the
	                    //   list boundArgs in the same order followed by the same
	                    //   values as the list ExtraArgs in the same order.
	                    // 5. Return the result of calling the [[Construct]] internal
	                    //   method of target providing args as the arguments.

	                    var result = apply.call(
	                        target,
	                        this,
	                        array_concat.call(args, array_slice.call(arguments))
	                    );
	                    if ($Object(result) === result) {
	                        return result;
	                    }
	                    return this;

	                } else {
	                    // 15.3.4.5.1 [[Call]]
	                    // When the [[Call]] internal method of a function object, F,
	                    // which was created using the bind function is called with a
	                    // this value and a list of arguments ExtraArgs, the following
	                    // steps are taken:
	                    // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
	                    //   property.
	                    // 2. Let boundThis be the value of F's [[BoundThis]] internal
	                    //   property.
	                    // 3. Let target be the value of F's [[TargetFunction]] internal
	                    //   property.
	                    // 4. Let args be a new list containing the same values as the
	                    //   list boundArgs in the same order followed by the same
	                    //   values as the list ExtraArgs in the same order.
	                    // 5. Return the result of calling the [[Call]] internal method
	                    //   of target providing boundThis as the this value and
	                    //   providing args as the arguments.

	                    // equiv: target.call(this, ...boundArgs, ...args)
	                    return apply.call(
	                        target,
	                        that,
	                        array_concat.call(args, array_slice.call(arguments))
	                    );

	                }

	            };

	            // 15. If the [[Class]] internal property of Target is "Function", then
	            //     a. Let L be the length property of Target minus the length of A.
	            //     b. Set the length own property of F to either 0 or L, whichever is
	            //       larger.
	            // 16. Else set the length own property of F to 0.

	            var boundLength = max(0, target.length - args.length);

	            // 17. Set the attributes of the length own property of F to the values
	            //   specified in 15.3.5.1.
	            var boundArgs = [];
	            for (var i = 0; i < boundLength; i++) {
	                array_push.call(boundArgs, '$' + i);
	            }

	            // XXX Build a dynamic function with desired amount of arguments is the only
	            // way to set the length property of a function.
	            // In environments where Content Security Policies enabled (Chrome extensions,
	            // for ex.) all use of eval or Function costructor throws an exception.
	            // However in all of these environments Function.prototype.bind exists
	            // and so this code will never be executed.
	            bound = $Function('binder', 'return function (' + array_join.call(boundArgs, ',') + '){ return binder.apply(this, arguments); }')(binder);

	            if (target.prototype) {
	                Empty.prototype = target.prototype;
	                bound.prototype = new Empty();
	                // Clean up dangling references.
	                Empty.prototype = null;
	            }

	            // TODO
	            // 18. Set the [[Extensible]] internal property of F to true.

	            // TODO
	            // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
	            // 20. Call the [[DefineOwnProperty]] internal method of F with
	            //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
	            //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
	            //   false.
	            // 21. Call the [[DefineOwnProperty]] internal method of F with
	            //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
	            //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
	            //   and false.

	            // TODO
	            // NOTE Function objects created using Function.prototype.bind do not
	            // have a prototype property or the [[Code]], [[FormalParameters]], and
	            // [[Scope]] internal properties.
	            // XXX can't delete prototype in pure-js.

	            // 22. Return F.
	            return bound;
	        }
	    });

	    // _Please note: Shortcuts are defined after `Function.prototype.bind` as we
	    // use it in defining shortcuts.
	    var owns = call.bind(ObjectPrototype.hasOwnProperty);
	    var toStr = call.bind(ObjectPrototype.toString);
	    var arraySlice = call.bind(array_slice);
	    var arraySliceApply = apply.bind(array_slice);
	    var strSlice = call.bind(StringPrototype.slice);
	    var strSplit = call.bind(StringPrototype.split);
	    var strIndexOf = call.bind(StringPrototype.indexOf);
	    var pushCall = call.bind(array_push);
	    var isEnum = call.bind(ObjectPrototype.propertyIsEnumerable);
	    var arraySort = call.bind(ArrayPrototype.sort);

	    //
	    // Array
	    // =====
	    //

	    var isArray = $Array.isArray || function isArray(obj) {
	        return toStr(obj) === '[object Array]';
	    };

	    // ES5 15.4.4.12
	    // http://es5.github.com/#x15.4.4.13
	    // Return len+argCount.
	    // [bugfix, ielt8]
	    // IE < 8 bug: [].unshift(0) === undefined but should be "1"
	    var hasUnshiftReturnValueBug = [].unshift(0) !== 1;
	    defineProperties(ArrayPrototype, {
	        unshift: function () {
	            array_unshift.apply(this, arguments);
	            return this.length;
	        }
	    }, hasUnshiftReturnValueBug);

	    // ES5 15.4.3.2
	    // http://es5.github.com/#x15.4.3.2
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
	    defineProperties($Array, { isArray: isArray });

	    // The IsCallable() check in the Array functions
	    // has been replaced with a strict check on the
	    // internal class of the object to trap cases where
	    // the provided function was actually a regular
	    // expression literal, which in V8 and
	    // JavaScriptCore is a typeof "function".  Only in
	    // V8 are regular expression literals permitted as
	    // reduce parameters, so it is desirable in the
	    // general case for the shim to match the more
	    // strict and common behavior of rejecting regular
	    // expressions.

	    // ES5 15.4.4.18
	    // http://es5.github.com/#x15.4.4.18
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/forEach

	    // Check failure of by-index access of string characters (IE < 9)
	    // and failure of `0 in boxedString` (Rhino)
	    var boxedString = $Object('a');
	    var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

	    var properlyBoxesContext = function properlyBoxed(method) {
	        // Check node 0.6.21 bug where third parameter is not boxed
	        var properlyBoxesNonStrict = true;
	        var properlyBoxesStrict = true;
	        var threwException = false;
	        if (method) {
	            try {
	                method.call('foo', function (_, __, context) {
	                    if (typeof context !== 'object') {
	                        properlyBoxesNonStrict = false;
	                    }
	                });

	                method.call([1], function () {
	                    'use strict';

	                    properlyBoxesStrict = typeof this === 'string';
	                }, 'x');
	            } catch (e) {
	                threwException = true;
	            }
	        }
	        return !!method && !threwException && properlyBoxesNonStrict && properlyBoxesStrict;
	    };

	    defineProperties(ArrayPrototype, {
	        forEach: function forEach(callbackfn/*, thisArg*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var i = -1;
	            var length = ES.ToUint32(self.length);
	            var T;
	            if (arguments.length > 1) {
	                T = arguments[1];
	            }

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.forEach callback must be a function');
	            }

	            while (++i < length) {
	                if (i in self) {
	                    // Invoke the callback function with call, passing arguments:
	                    // context, property value, property key, thisArg object
	                    if (typeof T === 'undefined') {
	                        callbackfn(self[i], i, object);
	                    } else {
	                        callbackfn.call(T, self[i], i, object);
	                    }
	                }
	            }
	        }
	    }, !properlyBoxesContext(ArrayPrototype.forEach));

	    // ES5 15.4.4.19
	    // http://es5.github.com/#x15.4.4.19
	    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
	    defineProperties(ArrayPrototype, {
	        map: function map(callbackfn/*, thisArg*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);
	            var result = $Array(length);
	            var T;
	            if (arguments.length > 1) {
	                T = arguments[1];
	            }

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.map callback must be a function');
	            }

	            for (var i = 0; i < length; i++) {
	                if (i in self) {
	                    if (typeof T === 'undefined') {
	                        result[i] = callbackfn(self[i], i, object);
	                    } else {
	                        result[i] = callbackfn.call(T, self[i], i, object);
	                    }
	                }
	            }
	            return result;
	        }
	    }, !properlyBoxesContext(ArrayPrototype.map));

	    // ES5 15.4.4.20
	    // http://es5.github.com/#x15.4.4.20
	    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter
	    defineProperties(ArrayPrototype, {
	        filter: function filter(callbackfn/*, thisArg*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);
	            var result = [];
	            var value;
	            var T;
	            if (arguments.length > 1) {
	                T = arguments[1];
	            }

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.filter callback must be a function');
	            }

	            for (var i = 0; i < length; i++) {
	                if (i in self) {
	                    value = self[i];
	                    if (typeof T === 'undefined' ? callbackfn(value, i, object) : callbackfn.call(T, value, i, object)) {
	                        pushCall(result, value);
	                    }
	                }
	            }
	            return result;
	        }
	    }, !properlyBoxesContext(ArrayPrototype.filter));

	    // ES5 15.4.4.16
	    // http://es5.github.com/#x15.4.4.16
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
	    defineProperties(ArrayPrototype, {
	        every: function every(callbackfn/*, thisArg*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);
	            var T;
	            if (arguments.length > 1) {
	                T = arguments[1];
	            }

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.every callback must be a function');
	            }

	            for (var i = 0; i < length; i++) {
	                if (i in self && !(typeof T === 'undefined' ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) {
	                    return false;
	                }
	            }
	            return true;
	        }
	    }, !properlyBoxesContext(ArrayPrototype.every));

	    // ES5 15.4.4.17
	    // http://es5.github.com/#x15.4.4.17
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
	    defineProperties(ArrayPrototype, {
	        some: function some(callbackfn/*, thisArg */) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);
	            var T;
	            if (arguments.length > 1) {
	                T = arguments[1];
	            }

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.some callback must be a function');
	            }

	            for (var i = 0; i < length; i++) {
	                if (i in self && (typeof T === 'undefined' ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) {
	                    return true;
	                }
	            }
	            return false;
	        }
	    }, !properlyBoxesContext(ArrayPrototype.some));

	    // ES5 15.4.4.21
	    // http://es5.github.com/#x15.4.4.21
	    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce
	    var reduceCoercesToObject = false;
	    if (ArrayPrototype.reduce) {
	        reduceCoercesToObject = typeof ArrayPrototype.reduce.call('es5', function (_, __, ___, list) {
	            return list;
	        }) === 'object';
	    }
	    defineProperties(ArrayPrototype, {
	        reduce: function reduce(callbackfn/*, initialValue*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.reduce callback must be a function');
	            }

	            // no value to return if no initial value and an empty array
	            if (length === 0 && arguments.length === 1) {
	                throw new TypeError('reduce of empty array with no initial value');
	            }

	            var i = 0;
	            var result;
	            if (arguments.length >= 2) {
	                result = arguments[1];
	            } else {
	                do {
	                    if (i in self) {
	                        result = self[i++];
	                        break;
	                    }

	                    // if array contains no values, no initial value to return
	                    if (++i >= length) {
	                        throw new TypeError('reduce of empty array with no initial value');
	                    }
	                } while (true);
	            }

	            for (; i < length; i++) {
	                if (i in self) {
	                    result = callbackfn(result, self[i], i, object);
	                }
	            }

	            return result;
	        }
	    }, !reduceCoercesToObject);

	    // ES5 15.4.4.22
	    // http://es5.github.com/#x15.4.4.22
	    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduceRight
	    var reduceRightCoercesToObject = false;
	    if (ArrayPrototype.reduceRight) {
	        reduceRightCoercesToObject = typeof ArrayPrototype.reduceRight.call('es5', function (_, __, ___, list) {
	            return list;
	        }) === 'object';
	    }
	    defineProperties(ArrayPrototype, {
	        reduceRight: function reduceRight(callbackfn/*, initial*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.reduceRight callback must be a function');
	            }

	            // no value to return if no initial value, empty array
	            if (length === 0 && arguments.length === 1) {
	                throw new TypeError('reduceRight of empty array with no initial value');
	            }

	            var result;
	            var i = length - 1;
	            if (arguments.length >= 2) {
	                result = arguments[1];
	            } else {
	                do {
	                    if (i in self) {
	                        result = self[i--];
	                        break;
	                    }

	                    // if array contains no values, no initial value to return
	                    if (--i < 0) {
	                        throw new TypeError('reduceRight of empty array with no initial value');
	                    }
	                } while (true);
	            }

	            if (i < 0) {
	                return result;
	            }

	            do {
	                if (i in self) {
	                    result = callbackfn(result, self[i], i, object);
	                }
	            } while (i--);

	            return result;
	        }
	    }, !reduceRightCoercesToObject);

	    // ES5 15.4.4.14
	    // http://es5.github.com/#x15.4.4.14
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
	    var hasFirefox2IndexOfBug = ArrayPrototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
	    defineProperties(ArrayPrototype, {
	        indexOf: function indexOf(searchElement/*, fromIndex */) {
	            var self = splitString && isString(this) ? strSplit(this, '') : ES.ToObject(this);
	            var length = ES.ToUint32(self.length);

	            if (length === 0) {
	                return -1;
	            }

	            var i = 0;
	            if (arguments.length > 1) {
	                i = ES.ToInteger(arguments[1]);
	            }

	            // handle negative indices
	            i = i >= 0 ? i : max(0, length + i);
	            for (; i < length; i++) {
	                if (i in self && self[i] === searchElement) {
	                    return i;
	                }
	            }
	            return -1;
	        }
	    }, hasFirefox2IndexOfBug);

	    // ES5 15.4.4.15
	    // http://es5.github.com/#x15.4.4.15
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf
	    var hasFirefox2LastIndexOfBug = ArrayPrototype.lastIndexOf && [0, 1].lastIndexOf(0, -3) !== -1;
	    defineProperties(ArrayPrototype, {
	        lastIndexOf: function lastIndexOf(searchElement/*, fromIndex */) {
	            var self = splitString && isString(this) ? strSplit(this, '') : ES.ToObject(this);
	            var length = ES.ToUint32(self.length);

	            if (length === 0) {
	                return -1;
	            }
	            var i = length - 1;
	            if (arguments.length > 1) {
	                i = min(i, ES.ToInteger(arguments[1]));
	            }
	            // handle negative indices
	            i = i >= 0 ? i : length - Math.abs(i);
	            for (; i >= 0; i--) {
	                if (i in self && searchElement === self[i]) {
	                    return i;
	                }
	            }
	            return -1;
	        }
	    }, hasFirefox2LastIndexOfBug);

	    // ES5 15.4.4.12
	    // http://es5.github.com/#x15.4.4.12
	    var spliceNoopReturnsEmptyArray = (function () {
	        var a = [1, 2];
	        var result = a.splice();
	        return a.length === 2 && isArray(result) && result.length === 0;
	    }());
	    defineProperties(ArrayPrototype, {
	        // Safari 5.0 bug where .splice() returns undefined
	        splice: function splice(start, deleteCount) {
	            if (arguments.length === 0) {
	                return [];
	            } else {
	                return array_splice.apply(this, arguments);
	            }
	        }
	    }, !spliceNoopReturnsEmptyArray);

	    var spliceWorksWithEmptyObject = (function () {
	        var obj = {};
	        ArrayPrototype.splice.call(obj, 0, 0, 1);
	        return obj.length === 1;
	    }());
	    defineProperties(ArrayPrototype, {
	        splice: function splice(start, deleteCount) {
	            if (arguments.length === 0) {
	                return [];
	            }
	            var args = arguments;
	            this.length = max(ES.ToInteger(this.length), 0);
	            if (arguments.length > 0 && typeof deleteCount !== 'number') {
	                args = arraySlice(arguments);
	                if (args.length < 2) {
	                    pushCall(args, this.length - start);
	                } else {
	                    args[1] = ES.ToInteger(deleteCount);
	                }
	            }
	            return array_splice.apply(this, args);
	        }
	    }, !spliceWorksWithEmptyObject);
	    var spliceWorksWithLargeSparseArrays = (function () {
	        // Per https://github.com/es-shims/es5-shim/issues/295
	        // Safari 7/8 breaks with sparse arrays of size 1e5 or greater
	        var arr = new $Array(1e5);
	        // note: the index MUST be 8 or larger or the test will false pass
	        arr[8] = 'x';
	        arr.splice(1, 1);
	        // note: this test must be defined *after* the indexOf shim
	        // per https://github.com/es-shims/es5-shim/issues/313
	        return arr.indexOf('x') === 7;
	    }());
	    var spliceWorksWithSmallSparseArrays = (function () {
	        // Per https://github.com/es-shims/es5-shim/issues/295
	        // Opera 12.15 breaks on this, no idea why.
	        var n = 256;
	        var arr = [];
	        arr[n] = 'a';
	        arr.splice(n + 1, 0, 'b');
	        return arr[n] === 'a';
	    }());
	    defineProperties(ArrayPrototype, {
	        splice: function splice(start, deleteCount) {
	            var O = ES.ToObject(this);
	            var A = [];
	            var len = ES.ToUint32(O.length);
	            var relativeStart = ES.ToInteger(start);
	            var actualStart = relativeStart < 0 ? max((len + relativeStart), 0) : min(relativeStart, len);
	            var actualDeleteCount = min(max(ES.ToInteger(deleteCount), 0), len - actualStart);

	            var k = 0;
	            var from;
	            while (k < actualDeleteCount) {
	                from = $String(actualStart + k);
	                if (owns(O, from)) {
	                    A[k] = O[from];
	                }
	                k += 1;
	            }

	            var items = arraySlice(arguments, 2);
	            var itemCount = items.length;
	            var to;
	            if (itemCount < actualDeleteCount) {
	                k = actualStart;
	                var maxK = len - actualDeleteCount;
	                while (k < maxK) {
	                    from = $String(k + actualDeleteCount);
	                    to = $String(k + itemCount);
	                    if (owns(O, from)) {
	                        O[to] = O[from];
	                    } else {
	                        delete O[to];
	                    }
	                    k += 1;
	                }
	                k = len;
	                var minK = len - actualDeleteCount + itemCount;
	                while (k > minK) {
	                    delete O[k - 1];
	                    k -= 1;
	                }
	            } else if (itemCount > actualDeleteCount) {
	                k = len - actualDeleteCount;
	                while (k > actualStart) {
	                    from = $String(k + actualDeleteCount - 1);
	                    to = $String(k + itemCount - 1);
	                    if (owns(O, from)) {
	                        O[to] = O[from];
	                    } else {
	                        delete O[to];
	                    }
	                    k -= 1;
	                }
	            }
	            k = actualStart;
	            for (var i = 0; i < items.length; ++i) {
	                O[k] = items[i];
	                k += 1;
	            }
	            O.length = len - actualDeleteCount + itemCount;

	            return A;
	        }
	    }, !spliceWorksWithLargeSparseArrays || !spliceWorksWithSmallSparseArrays);

	    var originalJoin = ArrayPrototype.join;
	    var hasStringJoinBug;
	    try {
	        hasStringJoinBug = Array.prototype.join.call('123', ',') !== '1,2,3';
	    } catch (e) {
	        hasStringJoinBug = true;
	    }
	    if (hasStringJoinBug) {
	        defineProperties(ArrayPrototype, {
	            join: function join(separator) {
	                var sep = typeof separator === 'undefined' ? ',' : separator;
	                return originalJoin.call(isString(this) ? strSplit(this, '') : this, sep);
	            }
	        }, hasStringJoinBug);
	    }

	    var hasJoinUndefinedBug = [1, 2].join(undefined) !== '1,2';
	    if (hasJoinUndefinedBug) {
	        defineProperties(ArrayPrototype, {
	            join: function join(separator) {
	                var sep = typeof separator === 'undefined' ? ',' : separator;
	                return originalJoin.call(this, sep);
	            }
	        }, hasJoinUndefinedBug);
	    }

	    var pushShim = function push(item) {
	        var O = ES.ToObject(this);
	        var n = ES.ToUint32(O.length);
	        var i = 0;
	        while (i < arguments.length) {
	            O[n + i] = arguments[i];
	            i += 1;
	        }
	        O.length = n + i;
	        return n + i;
	    };

	    var pushIsNotGeneric = (function () {
	        var obj = {};
	        var result = Array.prototype.push.call(obj, undefined);
	        return result !== 1 || obj.length !== 1 || typeof obj[0] !== 'undefined' || !owns(obj, 0);
	    }());
	    defineProperties(ArrayPrototype, {
	        push: function push(item) {
	            if (isArray(this)) {
	                return array_push.apply(this, arguments);
	            }
	            return pushShim.apply(this, arguments);
	        }
	    }, pushIsNotGeneric);

	    // This fixes a very weird bug in Opera 10.6 when pushing `undefined
	    var pushUndefinedIsWeird = (function () {
	        var arr = [];
	        var result = arr.push(undefined);
	        return result !== 1 || arr.length !== 1 || typeof arr[0] !== 'undefined' || !owns(arr, 0);
	    }());
	    defineProperties(ArrayPrototype, { push: pushShim }, pushUndefinedIsWeird);

	    // ES5 15.2.3.14
	    // http://es5.github.io/#x15.4.4.10
	    // Fix boxed string bug
	    defineProperties(ArrayPrototype, {
	        slice: function (start, end) {
	            var arr = isString(this) ? strSplit(this, '') : this;
	            return arraySliceApply(arr, arguments);
	        }
	    }, splitString);

	    var sortIgnoresNonFunctions = (function () {
	        try {
	            [1, 2].sort(null);
	            [1, 2].sort({});
	            return true;
	        } catch (e) {}
	        return false;
	    }());
	    var sortThrowsOnRegex = (function () {
	        // this is a problem in Firefox 4, in which `typeof /a/ === 'function'`
	        try {
	            [1, 2].sort(/a/);
	            return false;
	        } catch (e) {}
	        return true;
	    }());
	    var sortIgnoresUndefined = (function () {
	        // applies in IE 8, for one.
	        try {
	            [1, 2].sort(undefined);
	            return true;
	        } catch (e) {}
	        return false;
	    }());
	    defineProperties(ArrayPrototype, {
	        sort: function sort(compareFn) {
	            if (typeof compareFn === 'undefined') {
	                return arraySort(this);
	            }
	            if (!isCallable(compareFn)) {
	                throw new TypeError('Array.prototype.sort callback must be a function');
	            }
	            return arraySort(this, compareFn);
	        }
	    }, sortIgnoresNonFunctions || !sortIgnoresUndefined || !sortThrowsOnRegex);

	    //
	    // Object
	    // ======
	    //

	    // ES5 15.2.3.14
	    // http://es5.github.com/#x15.2.3.14

	    // http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
	    var hasDontEnumBug = !isEnum({ 'toString': null }, 'toString');
	    var hasProtoEnumBug = isEnum(function () {}, 'prototype');
	    var hasStringEnumBug = !owns('x', '0');
	    var equalsConstructorPrototype = function (o) {
	        var ctor = o.constructor;
	        return ctor && ctor.prototype === o;
	    };
	    var blacklistedKeys = {
	        $window: true,
	        $console: true,
	        $parent: true,
	        $self: true,
	        $frame: true,
	        $frames: true,
	        $frameElement: true,
	        $webkitIndexedDB: true,
	        $webkitStorageInfo: true,
	        $external: true
	    };
	    var hasAutomationEqualityBug = (function () {
	        /* globals window */
	        if (typeof window === 'undefined') {
	            return false;
	        }
	        for (var k in window) {
	            try {
	                if (!blacklistedKeys['$' + k] && owns(window, k) && window[k] !== null && typeof window[k] === 'object') {
	                    equalsConstructorPrototype(window[k]);
	                }
	            } catch (e) {
	                return true;
	            }
	        }
	        return false;
	    }());
	    var equalsConstructorPrototypeIfNotBuggy = function (object) {
	        if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
	            return equalsConstructorPrototype(object);
	        }
	        try {
	            return equalsConstructorPrototype(object);
	        } catch (e) {
	            return false;
	        }
	    };
	    var dontEnums = [
	        'toString',
	        'toLocaleString',
	        'valueOf',
	        'hasOwnProperty',
	        'isPrototypeOf',
	        'propertyIsEnumerable',
	        'constructor'
	    ];
	    var dontEnumsLength = dontEnums.length;

	    // taken directly from https://github.com/ljharb/is-arguments/blob/master/index.js
	    // can be replaced with require('is-arguments') if we ever use a build process instead
	    var isStandardArguments = function isArguments(value) {
	        return toStr(value) === '[object Arguments]';
	    };
	    var isLegacyArguments = function isArguments(value) {
	        return value !== null &&
	            typeof value === 'object' &&
	            typeof value.length === 'number' &&
	            value.length >= 0 &&
	            !isArray(value) &&
	            isCallable(value.callee);
	    };
	    var isArguments = isStandardArguments(arguments) ? isStandardArguments : isLegacyArguments;

	    defineProperties($Object, {
	        keys: function keys(object) {
	            var isFn = isCallable(object);
	            var isArgs = isArguments(object);
	            var isObject = object !== null && typeof object === 'object';
	            var isStr = isObject && isString(object);

	            if (!isObject && !isFn && !isArgs) {
	                throw new TypeError('Object.keys called on a non-object');
	            }

	            var theKeys = [];
	            var skipProto = hasProtoEnumBug && isFn;
	            if ((isStr && hasStringEnumBug) || isArgs) {
	                for (var i = 0; i < object.length; ++i) {
	                    pushCall(theKeys, $String(i));
	                }
	            }

	            if (!isArgs) {
	                for (var name in object) {
	                    if (!(skipProto && name === 'prototype') && owns(object, name)) {
	                        pushCall(theKeys, $String(name));
	                    }
	                }
	            }

	            if (hasDontEnumBug) {
	                var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
	                for (var j = 0; j < dontEnumsLength; j++) {
	                    var dontEnum = dontEnums[j];
	                    if (!(skipConstructor && dontEnum === 'constructor') && owns(object, dontEnum)) {
	                        pushCall(theKeys, dontEnum);
	                    }
	                }
	            }
	            return theKeys;
	        }
	    });

	    var keysWorksWithArguments = $Object.keys && (function () {
	        // Safari 5.0 bug
	        return $Object.keys(arguments).length === 2;
	    }(1, 2));
	    var keysHasArgumentsLengthBug = $Object.keys && (function () {
	        var argKeys = $Object.keys(arguments);
	        return arguments.length !== 1 || argKeys.length !== 1 || argKeys[0] !== 1;
	    }(1));
	    var originalKeys = $Object.keys;
	    defineProperties($Object, {
	        keys: function keys(object) {
	            if (isArguments(object)) {
	                return originalKeys(arraySlice(object));
	            } else {
	                return originalKeys(object);
	            }
	        }
	    }, !keysWorksWithArguments || keysHasArgumentsLengthBug);

	    //
	    // Date
	    // ====
	    //

	    var hasNegativeMonthYearBug = new Date(-3509827329600292).getUTCMonth() !== 0;
	    var aNegativeTestDate = new Date(-1509842289600292);
	    var aPositiveTestDate = new Date(1449662400000);
	    var hasToUTCStringFormatBug = aNegativeTestDate.toUTCString() !== 'Mon, 01 Jan -45875 11:59:59 GMT';
	    var hasToDateStringFormatBug;
	    var hasToStringFormatBug;
	    var timeZoneOffset = aNegativeTestDate.getTimezoneOffset();
	    if (timeZoneOffset < -720) {
	        hasToDateStringFormatBug = aNegativeTestDate.toDateString() !== 'Tue Jan 02 -45875';
	        hasToStringFormatBug = !(/^Thu Dec 10 2015 \d\d:\d\d:\d\d GMT[-\+]\d\d\d\d(?: |$)/).test(aPositiveTestDate.toString());
	    } else {
	        hasToDateStringFormatBug = aNegativeTestDate.toDateString() !== 'Mon Jan 01 -45875';
	        hasToStringFormatBug = !(/^Wed Dec 09 2015 \d\d:\d\d:\d\d GMT[-\+]\d\d\d\d(?: |$)/).test(aPositiveTestDate.toString());
	    }

	    var originalGetFullYear = call.bind(Date.prototype.getFullYear);
	    var originalGetMonth = call.bind(Date.prototype.getMonth);
	    var originalGetDate = call.bind(Date.prototype.getDate);
	    var originalGetUTCFullYear = call.bind(Date.prototype.getUTCFullYear);
	    var originalGetUTCMonth = call.bind(Date.prototype.getUTCMonth);
	    var originalGetUTCDate = call.bind(Date.prototype.getUTCDate);
	    var originalGetUTCDay = call.bind(Date.prototype.getUTCDay);
	    var originalGetUTCHours = call.bind(Date.prototype.getUTCHours);
	    var originalGetUTCMinutes = call.bind(Date.prototype.getUTCMinutes);
	    var originalGetUTCSeconds = call.bind(Date.prototype.getUTCSeconds);
	    var originalGetUTCMilliseconds = call.bind(Date.prototype.getUTCMilliseconds);
	    var dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	    var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	    var daysInMonth = function daysInMonth(month, year) {
	        return originalGetDate(new Date(year, month, 0));
	    };

	    defineProperties(Date.prototype, {
	        getFullYear: function getFullYear() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetFullYear(this);
	            if (year < 0 && originalGetMonth(this) > 11) {
	                return year + 1;
	            }
	            return year;
	        },
	        getMonth: function getMonth() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetFullYear(this);
	            var month = originalGetMonth(this);
	            if (year < 0 && month > 11) {
	                return 0;
	            }
	            return month;
	        },
	        getDate: function getDate() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetFullYear(this);
	            var month = originalGetMonth(this);
	            var date = originalGetDate(this);
	            if (year < 0 && month > 11) {
	                if (month === 12) {
	                    return date;
	                }
	                var days = daysInMonth(0, year + 1);
	                return (days - date) + 1;
	            }
	            return date;
	        },
	        getUTCFullYear: function getUTCFullYear() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetUTCFullYear(this);
	            if (year < 0 && originalGetUTCMonth(this) > 11) {
	                return year + 1;
	            }
	            return year;
	        },
	        getUTCMonth: function getUTCMonth() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetUTCFullYear(this);
	            var month = originalGetUTCMonth(this);
	            if (year < 0 && month > 11) {
	                return 0;
	            }
	            return month;
	        },
	        getUTCDate: function getUTCDate() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetUTCFullYear(this);
	            var month = originalGetUTCMonth(this);
	            var date = originalGetUTCDate(this);
	            if (year < 0 && month > 11) {
	                if (month === 12) {
	                    return date;
	                }
	                var days = daysInMonth(0, year + 1);
	                return (days - date) + 1;
	            }
	            return date;
	        }
	    }, hasNegativeMonthYearBug);

	    defineProperties(Date.prototype, {
	        toUTCString: function toUTCString() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var day = originalGetUTCDay(this);
	            var date = originalGetUTCDate(this);
	            var month = originalGetUTCMonth(this);
	            var year = originalGetUTCFullYear(this);
	            var hour = originalGetUTCHours(this);
	            var minute = originalGetUTCMinutes(this);
	            var second = originalGetUTCSeconds(this);
	            return dayName[day] + ', ' +
	                (date < 10 ? '0' + date : date) + ' ' +
	                monthName[month] + ' ' +
	                year + ' ' +
	                (hour < 10 ? '0' + hour : hour) + ':' +
	                (minute < 10 ? '0' + minute : minute) + ':' +
	                (second < 10 ? '0' + second : second) + ' GMT';
	        }
	    }, hasNegativeMonthYearBug || hasToUTCStringFormatBug);

	    // Opera 12 has `,`
	    defineProperties(Date.prototype, {
	        toDateString: function toDateString() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var day = this.getDay();
	            var date = this.getDate();
	            var month = this.getMonth();
	            var year = this.getFullYear();
	            return dayName[day] + ' ' +
	                monthName[month] + ' ' +
	                (date < 10 ? '0' + date : date) + ' ' +
	                year;
	        }
	    }, hasNegativeMonthYearBug || hasToDateStringFormatBug);

	    // can't use defineProperties here because of toString enumeration issue in IE <= 8
	    if (hasNegativeMonthYearBug || hasToStringFormatBug) {
	        Date.prototype.toString = function toString() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var day = this.getDay();
	            var date = this.getDate();
	            var month = this.getMonth();
	            var year = this.getFullYear();
	            var hour = this.getHours();
	            var minute = this.getMinutes();
	            var second = this.getSeconds();
	            var timezoneOffset = this.getTimezoneOffset();
	            var hoursOffset = Math.floor(Math.abs(timezoneOffset) / 60);
	            var minutesOffset = Math.floor(Math.abs(timezoneOffset) % 60);
	            return dayName[day] + ' ' +
	                monthName[month] + ' ' +
	                (date < 10 ? '0' + date : date) + ' ' +
	                year + ' ' +
	                (hour < 10 ? '0' + hour : hour) + ':' +
	                (minute < 10 ? '0' + minute : minute) + ':' +
	                (second < 10 ? '0' + second : second) + ' GMT' +
	                (timezoneOffset > 0 ? '-' : '+') +
	                (hoursOffset < 10 ? '0' + hoursOffset : hoursOffset) +
	                (minutesOffset < 10 ? '0' + minutesOffset : minutesOffset);
	        };
	        if (supportsDescriptors) {
	            $Object.defineProperty(Date.prototype, 'toString', {
	                configurable: true,
	                enumerable: false,
	                writable: true
	            });
	        }
	    }

	    // ES5 15.9.5.43
	    // http://es5.github.com/#x15.9.5.43
	    // This function returns a String value represent the instance in time
	    // represented by this Date object. The format of the String is the Date Time
	    // string format defined in 15.9.1.15. All fields are present in the String.
	    // The time zone is always UTC, denoted by the suffix Z. If the time value of
	    // this object is not a finite Number a RangeError exception is thrown.
	    var negativeDate = -62198755200000;
	    var negativeYearString = '-000001';
	    var hasNegativeDateBug = Date.prototype.toISOString && new Date(negativeDate).toISOString().indexOf(negativeYearString) === -1;
	    var hasSafari51DateBug = Date.prototype.toISOString && new Date(-1).toISOString() !== '1969-12-31T23:59:59.999Z';

	    var getTime = call.bind(Date.prototype.getTime);

	    defineProperties(Date.prototype, {
	        toISOString: function toISOString() {
	            if (!isFinite(this) || !isFinite(getTime(this))) {
	                // Adope Photoshop requires the second check.
	                throw new RangeError('Date.prototype.toISOString called on non-finite value.');
	            }

	            var year = originalGetUTCFullYear(this);

	            var month = originalGetUTCMonth(this);
	            // see https://github.com/es-shims/es5-shim/issues/111
	            year += Math.floor(month / 12);
	            month = (month % 12 + 12) % 12;

	            // the date time string format is specified in 15.9.1.15.
	            var result = [month + 1, originalGetUTCDate(this), originalGetUTCHours(this), originalGetUTCMinutes(this), originalGetUTCSeconds(this)];
	            year = (
	                (year < 0 ? '-' : (year > 9999 ? '+' : '')) +
	                strSlice('00000' + Math.abs(year), (0 <= year && year <= 9999) ? -4 : -6)
	            );

	            for (var i = 0; i < result.length; ++i) {
	                // pad months, days, hours, minutes, and seconds to have two digits.
	                result[i] = strSlice('00' + result[i], -2);
	            }
	            // pad milliseconds to have three digits.
	            return (
	                year + '-' + arraySlice(result, 0, 2).join('-') +
	                'T' + arraySlice(result, 2).join(':') + '.' +
	                strSlice('000' + originalGetUTCMilliseconds(this), -3) + 'Z'
	            );
	        }
	    }, hasNegativeDateBug || hasSafari51DateBug);

	    // ES5 15.9.5.44
	    // http://es5.github.com/#x15.9.5.44
	    // This function provides a String representation of a Date object for use by
	    // JSON.stringify (15.12.3).
	    var dateToJSONIsSupported = (function () {
	        try {
	            return Date.prototype.toJSON &&
	                new Date(NaN).toJSON() === null &&
	                new Date(negativeDate).toJSON().indexOf(negativeYearString) !== -1 &&
	                Date.prototype.toJSON.call({ // generic
	                    toISOString: function () { return true; }
	                });
	        } catch (e) {
	            return false;
	        }
	    }());
	    if (!dateToJSONIsSupported) {
	        Date.prototype.toJSON = function toJSON(key) {
	            // When the toJSON method is called with argument key, the following
	            // steps are taken:

	            // 1.  Let O be the result of calling ToObject, giving it the this
	            // value as its argument.
	            // 2. Let tv be ES.ToPrimitive(O, hint Number).
	            var O = $Object(this);
	            var tv = ES.ToPrimitive(O);
	            // 3. If tv is a Number and is not finite, return null.
	            if (typeof tv === 'number' && !isFinite(tv)) {
	                return null;
	            }
	            // 4. Let toISO be the result of calling the [[Get]] internal method of
	            // O with argument "toISOString".
	            var toISO = O.toISOString;
	            // 5. If IsCallable(toISO) is false, throw a TypeError exception.
	            if (!isCallable(toISO)) {
	                throw new TypeError('toISOString property is not callable');
	            }
	            // 6. Return the result of calling the [[Call]] internal method of
	            //  toISO with O as the this value and an empty argument list.
	            return toISO.call(O);

	            // NOTE 1 The argument is ignored.

	            // NOTE 2 The toJSON function is intentionally generic; it does not
	            // require that its this value be a Date object. Therefore, it can be
	            // transferred to other kinds of objects for use as a method. However,
	            // it does require that any such object have a toISOString method. An
	            // object is free to use the argument key to filter its
	            // stringification.
	        };
	    }

	    // ES5 15.9.4.2
	    // http://es5.github.com/#x15.9.4.2
	    // based on work shared by Daniel Friesen (dantman)
	    // http://gist.github.com/303249
	    var supportsExtendedYears = Date.parse('+033658-09-27T01:46:40.000Z') === 1e15;
	    var acceptsInvalidDates = !isNaN(Date.parse('2012-04-04T24:00:00.500Z')) || !isNaN(Date.parse('2012-11-31T23:59:59.000Z')) || !isNaN(Date.parse('2012-12-31T23:59:60.000Z'));
	    var doesNotParseY2KNewYear = isNaN(Date.parse('2000-01-01T00:00:00.000Z'));
	    if (doesNotParseY2KNewYear || acceptsInvalidDates || !supportsExtendedYears) {
	        // XXX global assignment won't work in embeddings that use
	        // an alternate object for the context.
	        /* global Date: true */
	        /* eslint-disable no-undef */
	        var maxSafeUnsigned32Bit = Math.pow(2, 31) - 1;
	        var hasSafariSignedIntBug = isActualNaN(new Date(1970, 0, 1, 0, 0, 0, maxSafeUnsigned32Bit + 1).getTime());
	        /* eslint-disable no-implicit-globals */
	        Date = (function (NativeDate) {
	        /* eslint-enable no-implicit-globals */
	        /* eslint-enable no-undef */
	            // Date.length === 7
	            var DateShim = function Date(Y, M, D, h, m, s, ms) {
	                var length = arguments.length;
	                var date;
	                if (this instanceof NativeDate) {
	                    var seconds = s;
	                    var millis = ms;
	                    if (hasSafariSignedIntBug && length >= 7 && ms > maxSafeUnsigned32Bit) {
	                        // work around a Safari 8/9 bug where it treats the seconds as signed
	                        var msToShift = Math.floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;
	                        var sToShift = Math.floor(msToShift / 1e3);
	                        seconds += sToShift;
	                        millis -= sToShift * 1e3;
	                    }
	                    date = length === 1 && $String(Y) === Y ? // isString(Y)
	                        // We explicitly pass it through parse:
	                        new NativeDate(DateShim.parse(Y)) :
	                        // We have to manually make calls depending on argument
	                        // length here
	                        length >= 7 ? new NativeDate(Y, M, D, h, m, seconds, millis) :
	                        length >= 6 ? new NativeDate(Y, M, D, h, m, seconds) :
	                        length >= 5 ? new NativeDate(Y, M, D, h, m) :
	                        length >= 4 ? new NativeDate(Y, M, D, h) :
	                        length >= 3 ? new NativeDate(Y, M, D) :
	                        length >= 2 ? new NativeDate(Y, M) :
	                        length >= 1 ? new NativeDate(Y instanceof NativeDate ? +Y : Y) :
	                                      new NativeDate();
	                } else {
	                    date = NativeDate.apply(this, arguments);
	                }
	                if (!isPrimitive(date)) {
	                    // Prevent mixups with unfixed Date object
	                    defineProperties(date, { constructor: DateShim }, true);
	                }
	                return date;
	            };

	            // 15.9.1.15 Date Time String Format.
	            var isoDateExpression = new RegExp('^' +
	                '(\\d{4}|[+-]\\d{6})' + // four-digit year capture or sign +
	                                          // 6-digit extended year
	                '(?:-(\\d{2})' + // optional month capture
	                '(?:-(\\d{2})' + // optional day capture
	                '(?:' + // capture hours:minutes:seconds.milliseconds
	                    'T(\\d{2})' + // hours capture
	                    ':(\\d{2})' + // minutes capture
	                    '(?:' + // optional :seconds.milliseconds
	                        ':(\\d{2})' + // seconds capture
	                        '(?:(\\.\\d{1,}))?' + // milliseconds capture
	                    ')?' +
	                '(' + // capture UTC offset component
	                    'Z|' + // UTC capture
	                    '(?:' + // offset specifier +/-hours:minutes
	                        '([-+])' + // sign capture
	                        '(\\d{2})' + // hours offset capture
	                        ':(\\d{2})' + // minutes offset capture
	                    ')' +
	                ')?)?)?)?' +
	            '$');

	            var months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];

	            var dayFromMonth = function dayFromMonth(year, month) {
	                var t = month > 1 ? 1 : 0;
	                return (
	                    months[month] +
	                    Math.floor((year - 1969 + t) / 4) -
	                    Math.floor((year - 1901 + t) / 100) +
	                    Math.floor((year - 1601 + t) / 400) +
	                    365 * (year - 1970)
	                );
	            };

	            var toUTC = function toUTC(t) {
	                var s = 0;
	                var ms = t;
	                if (hasSafariSignedIntBug && ms > maxSafeUnsigned32Bit) {
	                    // work around a Safari 8/9 bug where it treats the seconds as signed
	                    var msToShift = Math.floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;
	                    var sToShift = Math.floor(msToShift / 1e3);
	                    s += sToShift;
	                    ms -= sToShift * 1e3;
	                }
	                return $Number(new NativeDate(1970, 0, 1, 0, 0, s, ms));
	            };

	            // Copy any custom methods a 3rd party library may have added
	            for (var key in NativeDate) {
	                if (owns(NativeDate, key)) {
	                    DateShim[key] = NativeDate[key];
	                }
	            }

	            // Copy "native" methods explicitly; they may be non-enumerable
	            defineProperties(DateShim, {
	                now: NativeDate.now,
	                UTC: NativeDate.UTC
	            }, true);
	            DateShim.prototype = NativeDate.prototype;
	            defineProperties(DateShim.prototype, {
	                constructor: DateShim
	            }, true);

	            // Upgrade Date.parse to handle simplified ISO 8601 strings
	            var parseShim = function parse(string) {
	                var match = isoDateExpression.exec(string);
	                if (match) {
	                    // parse months, days, hours, minutes, seconds, and milliseconds
	                    // provide default values if necessary
	                    // parse the UTC offset component
	                    var year = $Number(match[1]),
	                        month = $Number(match[2] || 1) - 1,
	                        day = $Number(match[3] || 1) - 1,
	                        hour = $Number(match[4] || 0),
	                        minute = $Number(match[5] || 0),
	                        second = $Number(match[6] || 0),
	                        millisecond = Math.floor($Number(match[7] || 0) * 1000),
	                        // When time zone is missed, local offset should be used
	                        // (ES 5.1 bug)
	                        // see https://bugs.ecmascript.org/show_bug.cgi?id=112
	                        isLocalTime = Boolean(match[4] && !match[8]),
	                        signOffset = match[9] === '-' ? 1 : -1,
	                        hourOffset = $Number(match[10] || 0),
	                        minuteOffset = $Number(match[11] || 0),
	                        result;
	                    var hasMinutesOrSecondsOrMilliseconds = minute > 0 || second > 0 || millisecond > 0;
	                    if (
	                        hour < (hasMinutesOrSecondsOrMilliseconds ? 24 : 25) &&
	                        minute < 60 && second < 60 && millisecond < 1000 &&
	                        month > -1 && month < 12 && hourOffset < 24 &&
	                        minuteOffset < 60 && // detect invalid offsets
	                        day > -1 &&
	                        day < (dayFromMonth(year, month + 1) - dayFromMonth(year, month))
	                    ) {
	                        result = (
	                            (dayFromMonth(year, month) + day) * 24 +
	                            hour +
	                            hourOffset * signOffset
	                        ) * 60;
	                        result = (
	                            (result + minute + minuteOffset * signOffset) * 60 +
	                            second
	                        ) * 1000 + millisecond;
	                        if (isLocalTime) {
	                            result = toUTC(result);
	                        }
	                        if (-8.64e15 <= result && result <= 8.64e15) {
	                            return result;
	                        }
	                    }
	                    return NaN;
	                }
	                return NativeDate.parse.apply(this, arguments);
	            };
	            defineProperties(DateShim, { parse: parseShim });

	            return DateShim;
	        }(Date));
	        /* global Date: false */
	    }

	    // ES5 15.9.4.4
	    // http://es5.github.com/#x15.9.4.4
	    if (!Date.now) {
	        Date.now = function now() {
	            return new Date().getTime();
	        };
	    }

	    //
	    // Number
	    // ======
	    //

	    // ES5.1 15.7.4.5
	    // http://es5.github.com/#x15.7.4.5
	    var hasToFixedBugs = NumberPrototype.toFixed && (
	      (0.00008).toFixed(3) !== '0.000' ||
	      (0.9).toFixed(0) !== '1' ||
	      (1.255).toFixed(2) !== '1.25' ||
	      (1000000000000000128).toFixed(0) !== '1000000000000000128'
	    );

	    var toFixedHelpers = {
	        base: 1e7,
	        size: 6,
	        data: [0, 0, 0, 0, 0, 0],
	        multiply: function multiply(n, c) {
	            var i = -1;
	            var c2 = c;
	            while (++i < toFixedHelpers.size) {
	                c2 += n * toFixedHelpers.data[i];
	                toFixedHelpers.data[i] = c2 % toFixedHelpers.base;
	                c2 = Math.floor(c2 / toFixedHelpers.base);
	            }
	        },
	        divide: function divide(n) {
	            var i = toFixedHelpers.size;
	            var c = 0;
	            while (--i >= 0) {
	                c += toFixedHelpers.data[i];
	                toFixedHelpers.data[i] = Math.floor(c / n);
	                c = (c % n) * toFixedHelpers.base;
	            }
	        },
	        numToString: function numToString() {
	            var i = toFixedHelpers.size;
	            var s = '';
	            while (--i >= 0) {
	                if (s !== '' || i === 0 || toFixedHelpers.data[i] !== 0) {
	                    var t = $String(toFixedHelpers.data[i]);
	                    if (s === '') {
	                        s = t;
	                    } else {
	                        s += strSlice('0000000', 0, 7 - t.length) + t;
	                    }
	                }
	            }
	            return s;
	        },
	        pow: function pow(x, n, acc) {
	            return (n === 0 ? acc : (n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc)));
	        },
	        log: function log(x) {
	            var n = 0;
	            var x2 = x;
	            while (x2 >= 4096) {
	                n += 12;
	                x2 /= 4096;
	            }
	            while (x2 >= 2) {
	                n += 1;
	                x2 /= 2;
	            }
	            return n;
	        }
	    };

	    var toFixedShim = function toFixed(fractionDigits) {
	        var f, x, s, m, e, z, j, k;

	        // Test for NaN and round fractionDigits down
	        f = $Number(fractionDigits);
	        f = isActualNaN(f) ? 0 : Math.floor(f);

	        if (f < 0 || f > 20) {
	            throw new RangeError('Number.toFixed called with invalid number of decimals');
	        }

	        x = $Number(this);

	        if (isActualNaN(x)) {
	            return 'NaN';
	        }

	        // If it is too big or small, return the string value of the number
	        if (x <= -1e21 || x >= 1e21) {
	            return $String(x);
	        }

	        s = '';

	        if (x < 0) {
	            s = '-';
	            x = -x;
	        }

	        m = '0';

	        if (x > 1e-21) {
	            // 1e-21 < x < 1e21
	            // -70 < log2(x) < 70
	            e = toFixedHelpers.log(x * toFixedHelpers.pow(2, 69, 1)) - 69;
	            z = (e < 0 ? x * toFixedHelpers.pow(2, -e, 1) : x / toFixedHelpers.pow(2, e, 1));
	            z *= 0x10000000000000; // Math.pow(2, 52);
	            e = 52 - e;

	            // -18 < e < 122
	            // x = z / 2 ^ e
	            if (e > 0) {
	                toFixedHelpers.multiply(0, z);
	                j = f;

	                while (j >= 7) {
	                    toFixedHelpers.multiply(1e7, 0);
	                    j -= 7;
	                }

	                toFixedHelpers.multiply(toFixedHelpers.pow(10, j, 1), 0);
	                j = e - 1;

	                while (j >= 23) {
	                    toFixedHelpers.divide(1 << 23);
	                    j -= 23;
	                }

	                toFixedHelpers.divide(1 << j);
	                toFixedHelpers.multiply(1, 1);
	                toFixedHelpers.divide(2);
	                m = toFixedHelpers.numToString();
	            } else {
	                toFixedHelpers.multiply(0, z);
	                toFixedHelpers.multiply(1 << (-e), 0);
	                m = toFixedHelpers.numToString() + strSlice('0.00000000000000000000', 2, 2 + f);
	            }
	        }

	        if (f > 0) {
	            k = m.length;

	            if (k <= f) {
	                m = s + strSlice('0.0000000000000000000', 0, f - k + 2) + m;
	            } else {
	                m = s + strSlice(m, 0, k - f) + '.' + strSlice(m, k - f);
	            }
	        } else {
	            m = s + m;
	        }

	        return m;
	    };
	    defineProperties(NumberPrototype, { toFixed: toFixedShim }, hasToFixedBugs);

	    var hasToPrecisionUndefinedBug = (function () {
	        try {
	            return 1.0.toPrecision(undefined) === '1';
	        } catch (e) {
	            return true;
	        }
	    }());
	    var originalToPrecision = NumberPrototype.toPrecision;
	    defineProperties(NumberPrototype, {
	        toPrecision: function toPrecision(precision) {
	            return typeof precision === 'undefined' ? originalToPrecision.call(this) : originalToPrecision.call(this, precision);
	        }
	    }, hasToPrecisionUndefinedBug);

	    //
	    // String
	    // ======
	    //

	    // ES5 15.5.4.14
	    // http://es5.github.com/#x15.5.4.14

	    // [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
	    // Many browsers do not split properly with regular expressions or they
	    // do not perform the split correctly under obscure conditions.
	    // See http://blog.stevenlevithan.com/archives/cross-browser-split
	    // I've tested in many browsers and this seems to cover the deviant ones:
	    //    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
	    //    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
	    //    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
	    //       [undefined, "t", undefined, "e", ...]
	    //    ''.split(/.?/) should be [], not [""]
	    //    '.'.split(/()()/) should be ["."], not ["", "", "."]

	    if (
	        'ab'.split(/(?:ab)*/).length !== 2 ||
	        '.'.split(/(.?)(.?)/).length !== 4 ||
	        'tesst'.split(/(s)*/)[1] === 't' ||
	        'test'.split(/(?:)/, -1).length !== 4 ||
	        ''.split(/.?/).length ||
	        '.'.split(/()()/).length > 1
	    ) {
	        (function () {
	            var compliantExecNpcg = typeof (/()??/).exec('')[1] === 'undefined'; // NPCG: nonparticipating capturing group
	            var maxSafe32BitInt = Math.pow(2, 32) - 1;

	            StringPrototype.split = function (separator, limit) {
	                var string = String(this);
	                if (typeof separator === 'undefined' && limit === 0) {
	                    return [];
	                }

	                // If `separator` is not a regex, use native split
	                if (!isRegex(separator)) {
	                    return strSplit(this, separator, limit);
	                }

	                var output = [];
	                var flags = (separator.ignoreCase ? 'i' : '') +
	                            (separator.multiline ? 'm' : '') +
	                            (separator.unicode ? 'u' : '') + // in ES6
	                            (separator.sticky ? 'y' : ''), // Firefox 3+ and ES6
	                    lastLastIndex = 0,
	                    // Make `global` and avoid `lastIndex` issues by working with a copy
	                    separator2, match, lastIndex, lastLength;
	                var separatorCopy = new RegExp(separator.source, flags + 'g');
	                if (!compliantExecNpcg) {
	                    // Doesn't need flags gy, but they don't hurt
	                    separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
	                }
	                /* Values for `limit`, per the spec:
	                 * If undefined: 4294967295 // maxSafe32BitInt
	                 * If 0, Infinity, or NaN: 0
	                 * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
	                 * If negative number: 4294967296 - Math.floor(Math.abs(limit))
	                 * If other: Type-convert, then use the above rules
	                 */
	                var splitLimit = typeof limit === 'undefined' ? maxSafe32BitInt : ES.ToUint32(limit);
	                match = separatorCopy.exec(string);
	                while (match) {
	                    // `separatorCopy.lastIndex` is not reliable cross-browser
	                    lastIndex = match.index + match[0].length;
	                    if (lastIndex > lastLastIndex) {
	                        pushCall(output, strSlice(string, lastLastIndex, match.index));
	                        // Fix browsers whose `exec` methods don't consistently return `undefined` for
	                        // nonparticipating capturing groups
	                        if (!compliantExecNpcg && match.length > 1) {
	                            /* eslint-disable no-loop-func */
	                            match[0].replace(separator2, function () {
	                                for (var i = 1; i < arguments.length - 2; i++) {
	                                    if (typeof arguments[i] === 'undefined') {
	                                        match[i] = void 0;
	                                    }
	                                }
	                            });
	                            /* eslint-enable no-loop-func */
	                        }
	                        if (match.length > 1 && match.index < string.length) {
	                            array_push.apply(output, arraySlice(match, 1));
	                        }
	                        lastLength = match[0].length;
	                        lastLastIndex = lastIndex;
	                        if (output.length >= splitLimit) {
	                            break;
	                        }
	                    }
	                    if (separatorCopy.lastIndex === match.index) {
	                        separatorCopy.lastIndex++; // Avoid an infinite loop
	                    }
	                    match = separatorCopy.exec(string);
	                }
	                if (lastLastIndex === string.length) {
	                    if (lastLength || !separatorCopy.test('')) {
	                        pushCall(output, '');
	                    }
	                } else {
	                    pushCall(output, strSlice(string, lastLastIndex));
	                }
	                return output.length > splitLimit ? arraySlice(output, 0, splitLimit) : output;
	            };
	        }());

	    // [bugfix, chrome]
	    // If separator is undefined, then the result array contains just one String,
	    // which is the this value (converted to a String). If limit is not undefined,
	    // then the output array is truncated so that it contains no more than limit
	    // elements.
	    // "0".split(undefined, 0) -> []
	    } else if ('0'.split(void 0, 0).length) {
	        StringPrototype.split = function split(separator, limit) {
	            if (typeof separator === 'undefined' && limit === 0) {
	                return [];
	            }
	            return strSplit(this, separator, limit);
	        };
	    }

	    var str_replace = StringPrototype.replace;
	    var replaceReportsGroupsCorrectly = (function () {
	        var groups = [];
	        'x'.replace(/x(.)?/g, function (match, group) {
	            pushCall(groups, group);
	        });
	        return groups.length === 1 && typeof groups[0] === 'undefined';
	    }());

	    if (!replaceReportsGroupsCorrectly) {
	        StringPrototype.replace = function replace(searchValue, replaceValue) {
	            var isFn = isCallable(replaceValue);
	            var hasCapturingGroups = isRegex(searchValue) && (/\)[*?]/).test(searchValue.source);
	            if (!isFn || !hasCapturingGroups) {
	                return str_replace.call(this, searchValue, replaceValue);
	            } else {
	                var wrappedReplaceValue = function (match) {
	                    var length = arguments.length;
	                    var originalLastIndex = searchValue.lastIndex;
	                    searchValue.lastIndex = 0;
	                    var args = searchValue.exec(match) || [];
	                    searchValue.lastIndex = originalLastIndex;
	                    pushCall(args, arguments[length - 2], arguments[length - 1]);
	                    return replaceValue.apply(this, args);
	                };
	                return str_replace.call(this, searchValue, wrappedReplaceValue);
	            }
	        };
	    }

	    // ECMA-262, 3rd B.2.3
	    // Not an ECMAScript standard, although ECMAScript 3rd Edition has a
	    // non-normative section suggesting uniform semantics and it should be
	    // normalized across all browsers
	    // [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
	    var string_substr = StringPrototype.substr;
	    var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
	    defineProperties(StringPrototype, {
	        substr: function substr(start, length) {
	            var normalizedStart = start;
	            if (start < 0) {
	                normalizedStart = max(this.length + start, 0);
	            }
	            return string_substr.call(this, normalizedStart, length);
	        }
	    }, hasNegativeSubstrBug);

	    // ES5 15.5.4.20
	    // whitespace from: http://es5.github.io/#x15.5.4.20
	    var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	        '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' +
	        '\u2029\uFEFF';
	    var zeroWidth = '\u200b';
	    var wsRegexChars = '[' + ws + ']';
	    var trimBeginRegexp = new RegExp('^' + wsRegexChars + wsRegexChars + '*');
	    var trimEndRegexp = new RegExp(wsRegexChars + wsRegexChars + '*$');
	    var hasTrimWhitespaceBug = StringPrototype.trim && (ws.trim() || !zeroWidth.trim());
	    defineProperties(StringPrototype, {
	        // http://blog.stevenlevithan.com/archives/faster-trim-javascript
	        // http://perfectionkills.com/whitespace-deviations/
	        trim: function trim() {
	            if (typeof this === 'undefined' || this === null) {
	                throw new TypeError("can't convert " + this + ' to object');
	            }
	            return $String(this).replace(trimBeginRegexp, '').replace(trimEndRegexp, '');
	        }
	    }, hasTrimWhitespaceBug);
	    var trim = call.bind(String.prototype.trim);

	    var hasLastIndexBug = StringPrototype.lastIndexOf && 'abcあい'.lastIndexOf('あい', 2) !== -1;
	    defineProperties(StringPrototype, {
	        lastIndexOf: function lastIndexOf(searchString) {
	            if (typeof this === 'undefined' || this === null) {
	                throw new TypeError("can't convert " + this + ' to object');
	            }
	            var S = $String(this);
	            var searchStr = $String(searchString);
	            var numPos = arguments.length > 1 ? $Number(arguments[1]) : NaN;
	            var pos = isActualNaN(numPos) ? Infinity : ES.ToInteger(numPos);
	            var start = min(max(pos, 0), S.length);
	            var searchLen = searchStr.length;
	            var k = start + searchLen;
	            while (k > 0) {
	                k = max(0, k - searchLen);
	                var index = strIndexOf(strSlice(S, k, start + searchLen), searchStr);
	                if (index !== -1) {
	                    return k + index;
	                }
	            }
	            return -1;
	        }
	    }, hasLastIndexBug);

	    var originalLastIndexOf = StringPrototype.lastIndexOf;
	    defineProperties(StringPrototype, {
	        lastIndexOf: function lastIndexOf(searchString) {
	            return originalLastIndexOf.apply(this, arguments);
	        }
	    }, StringPrototype.lastIndexOf.length !== 1);

	    // ES-5 15.1.2.2
	    /* eslint-disable radix */
	    if (parseInt(ws + '08') !== 8 || parseInt(ws + '0x16') !== 22) {
	    /* eslint-enable radix */
	        /* global parseInt: true */
	        parseInt = (function (origParseInt) {
	            var hexRegex = /^[\-+]?0[xX]/;
	            return function parseInt(str, radix) {
	                var string = trim(String(str));
	                var defaultedRadix = $Number(radix) || (hexRegex.test(string) ? 16 : 10);
	                return origParseInt(string, defaultedRadix);
	            };
	        }(parseInt));
	    }

	    // https://es5.github.io/#x15.1.2.3
	    if (1 / parseFloat('-0') !== -Infinity) {
	        /* global parseFloat: true */
	        parseFloat = (function (origParseFloat) {
	            return function parseFloat(string) {
	                var inputString = trim(String(string));
	                var result = origParseFloat(inputString);
	                return result === 0 && strSlice(inputString, 0, 1) === '-' ? -0 : result;
	            };
	        }(parseFloat));
	    }

	    if (String(new RangeError('test')) !== 'RangeError: test') {
	        var errorToStringShim = function toString() {
	            if (typeof this === 'undefined' || this === null) {
	                throw new TypeError("can't convert " + this + ' to object');
	            }
	            var name = this.name;
	            if (typeof name === 'undefined') {
	                name = 'Error';
	            } else if (typeof name !== 'string') {
	                name = $String(name);
	            }
	            var msg = this.message;
	            if (typeof msg === 'undefined') {
	                msg = '';
	            } else if (typeof msg !== 'string') {
	                msg = $String(msg);
	            }
	            if (!name) {
	                return msg;
	            }
	            if (!msg) {
	                return name;
	            }
	            return name + ': ' + msg;
	        };
	        // can't use defineProperties here because of toString enumeration issue in IE <= 8
	        Error.prototype.toString = errorToStringShim;
	    }

	    if (supportsDescriptors) {
	        var ensureNonEnumerable = function (obj, prop) {
	            if (isEnum(obj, prop)) {
	                var desc = Object.getOwnPropertyDescriptor(obj, prop);
	                if (desc.configurable) {
	                    desc.enumerable = false;
	                    Object.defineProperty(obj, prop, desc);
	                }
	            }
	        };
	        ensureNonEnumerable(Error.prototype, 'message');
	        if (Error.prototype.message !== '') {
	            Error.prototype.message = '';
	        }
	        ensureNonEnumerable(Error.prototype, 'name');
	    }

	    if (String(/a/mig) !== '/a/gim') {
	        var regexToString = function toString() {
	            var str = '/' + this.source + '/';
	            if (this.global) {
	                str += 'g';
	            }
	            if (this.ignoreCase) {
	                str += 'i';
	            }
	            if (this.multiline) {
	                str += 'm';
	            }
	            return str;
	        };
	        // can't use defineProperties here because of toString enumeration issue in IE <= 8
	        RegExp.prototype.toString = regexToString;
	    }
	}));


/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * https://github.com/es-shims/es5-shim
	 * @license es5-shim Copyright 2009-2015 by contributors, MIT License
	 * see https://github.com/es-shims/es5-shim/blob/master/LICENSE
	 */

	// vim: ts=4 sts=4 sw=4 expandtab

	// Add semicolon to prevent IIFE from being passed as argument to concatenated code.
	;

	// UMD (Universal Module Definition)
	// see https://github.com/umdjs/umd/blob/master/templates/returnExports.js
	(function (root, factory) {
	    'use strict';

	    /* global define, exports, module */
	    if (true) {
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        // Node. Does not work with strict CommonJS, but
	        // only CommonJS-like enviroments that support module.exports,
	        // like Node.
	        module.exports = factory();
	    } else {
	        // Browser globals (root is window)
	        root.returnExports = factory();
	    }
	}(this, function () {

	    var call = Function.call;
	    var prototypeOfObject = Object.prototype;
	    var owns = call.bind(prototypeOfObject.hasOwnProperty);
	    var isEnumerable = call.bind(prototypeOfObject.propertyIsEnumerable);
	    var toStr = call.bind(prototypeOfObject.toString);

	    // If JS engine supports accessors creating shortcuts.
	    var defineGetter;
	    var defineSetter;
	    var lookupGetter;
	    var lookupSetter;
	    var supportsAccessors = owns(prototypeOfObject, '__defineGetter__');
	    if (supportsAccessors) {
	        /* eslint-disable no-underscore-dangle */
	        defineGetter = call.bind(prototypeOfObject.__defineGetter__);
	        defineSetter = call.bind(prototypeOfObject.__defineSetter__);
	        lookupGetter = call.bind(prototypeOfObject.__lookupGetter__);
	        lookupSetter = call.bind(prototypeOfObject.__lookupSetter__);
	        /* eslint-enable no-underscore-dangle */
	    }

	    var isPrimitive = function isPrimitive(o) {
	        return o == null || (typeof o !== 'object' && typeof o !== 'function');
	    };

	    // ES5 15.2.3.2
	    // http://es5.github.com/#x15.2.3.2
	    if (!Object.getPrototypeOf) {
	        // https://github.com/es-shims/es5-shim/issues#issue/2
	        // http://ejohn.org/blog/objectgetprototypeof/
	        // recommended by fschaefer on github
	        //
	        // sure, and webreflection says ^_^
	        // ... this will nerever possibly return null
	        // ... Opera Mini breaks here with infinite loops
	        Object.getPrototypeOf = function getPrototypeOf(object) {
	            /* eslint-disable no-proto */
	            var proto = object.__proto__;
	            /* eslint-enable no-proto */
	            if (proto || proto === null) {
	                return proto;
	            } else if (toStr(object.constructor) === '[object Function]') {
	                return object.constructor.prototype;
	            } else if (object instanceof Object) {
	                return prototypeOfObject;
	            } else {
	                // Correctly return null for Objects created with `Object.create(null)`
	                // (shammed or native) or `{ __proto__: null}`.  Also returns null for
	                // cross-realm objects on browsers that lack `__proto__` support (like
	                // IE <11), but that's the best we can do.
	                return null;
	            }
	        };
	    }

	    // ES5 15.2.3.3
	    // http://es5.github.com/#x15.2.3.3

	    var doesGetOwnPropertyDescriptorWork = function doesGetOwnPropertyDescriptorWork(object) {
	        try {
	            object.sentinel = 0;
	            return Object.getOwnPropertyDescriptor(object, 'sentinel').value === 0;
	        } catch (exception) {
	            return false;
	        }
	    };

	    // check whether getOwnPropertyDescriptor works if it's given. Otherwise, shim partially.
	    if (Object.defineProperty) {
	        var getOwnPropertyDescriptorWorksOnObject = doesGetOwnPropertyDescriptorWork({});
	        var getOwnPropertyDescriptorWorksOnDom = typeof document === 'undefined' ||
	        doesGetOwnPropertyDescriptorWork(document.createElement('div'));
	        if (!getOwnPropertyDescriptorWorksOnDom || !getOwnPropertyDescriptorWorksOnObject) {
	            var getOwnPropertyDescriptorFallback = Object.getOwnPropertyDescriptor;
	        }
	    }

	    if (!Object.getOwnPropertyDescriptor || getOwnPropertyDescriptorFallback) {
	        var ERR_NON_OBJECT = 'Object.getOwnPropertyDescriptor called on a non-object: ';

	        /* eslint-disable no-proto */
	        Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(object, property) {
	            if (isPrimitive(object)) {
	                throw new TypeError(ERR_NON_OBJECT + object);
	            }

	            // make a valiant attempt to use the real getOwnPropertyDescriptor
	            // for I8's DOM elements.
	            if (getOwnPropertyDescriptorFallback) {
	                try {
	                    return getOwnPropertyDescriptorFallback.call(Object, object, property);
	                } catch (exception) {
	                    // try the shim if the real one doesn't work
	                }
	            }

	            var descriptor;

	            // If object does not owns property return undefined immediately.
	            if (!owns(object, property)) {
	                return descriptor;
	            }

	            // If object has a property then it's for sure `configurable`, and
	            // probably `enumerable`. Detect enumerability though.
	            descriptor = {
	                enumerable: isEnumerable(object, property),
	                configurable: true
	            };

	            // If JS engine supports accessor properties then property may be a
	            // getter or setter.
	            if (supportsAccessors) {
	                // Unfortunately `__lookupGetter__` will return a getter even
	                // if object has own non getter property along with a same named
	                // inherited getter. To avoid misbehavior we temporary remove
	                // `__proto__` so that `__lookupGetter__` will return getter only
	                // if it's owned by an object.
	                var prototype = object.__proto__;
	                var notPrototypeOfObject = object !== prototypeOfObject;
	                // avoid recursion problem, breaking in Opera Mini when
	                // Object.getOwnPropertyDescriptor(Object.prototype, 'toString')
	                // or any other Object.prototype accessor
	                if (notPrototypeOfObject) {
	                    object.__proto__ = prototypeOfObject;
	                }

	                var getter = lookupGetter(object, property);
	                var setter = lookupSetter(object, property);

	                if (notPrototypeOfObject) {
	                    // Once we have getter and setter we can put values back.
	                    object.__proto__ = prototype;
	                }

	                if (getter || setter) {
	                    if (getter) {
	                        descriptor.get = getter;
	                    }
	                    if (setter) {
	                        descriptor.set = setter;
	                    }
	                    // If it was accessor property we're done and return here
	                    // in order to avoid adding `value` to the descriptor.
	                    return descriptor;
	                }
	            }

	            // If we got this far we know that object has an own property that is
	            // not an accessor so we set it as a value and return descriptor.
	            descriptor.value = object[property];
	            descriptor.writable = true;
	            return descriptor;
	        };
	        /* eslint-enable no-proto */
	    }

	    // ES5 15.2.3.4
	    // http://es5.github.com/#x15.2.3.4
	    if (!Object.getOwnPropertyNames) {
	        Object.getOwnPropertyNames = function getOwnPropertyNames(object) {
	            return Object.keys(object);
	        };
	    }

	    // ES5 15.2.3.5
	    // http://es5.github.com/#x15.2.3.5
	    if (!Object.create) {

	        // Contributed by Brandon Benvie, October, 2012
	        var createEmpty;
	        var supportsProto = !({ __proto__: null } instanceof Object);
	                            // the following produces false positives
	                            // in Opera Mini => not a reliable check
	                            // Object.prototype.__proto__ === null

	        // Check for document.domain and active x support
	        // No need to use active x approach when document.domain is not set
	        // see https://github.com/es-shims/es5-shim/issues/150
	        // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	        /* global ActiveXObject */
	        var shouldUseActiveX = function shouldUseActiveX() {
	            // return early if document.domain not set
	            if (!document.domain) {
	                return false;
	            }

	            try {
	                return !!new ActiveXObject('htmlfile');
	            } catch (exception) {
	                return false;
	            }
	        };

	        // This supports IE8 when document.domain is used
	        // see https://github.com/es-shims/es5-shim/issues/150
	        // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	        var getEmptyViaActiveX = function getEmptyViaActiveX() {
	            var empty;
	            var xDoc;

	            xDoc = new ActiveXObject('htmlfile');

	            var script = 'script';
	            xDoc.write('<' + script + '></' + script + '>');
	            xDoc.close();

	            empty = xDoc.parentWindow.Object.prototype;
	            xDoc = null;

	            return empty;
	        };

	        // The original implementation using an iframe
	        // before the activex approach was added
	        // see https://github.com/es-shims/es5-shim/issues/150
	        var getEmptyViaIFrame = function getEmptyViaIFrame() {
	            var iframe = document.createElement('iframe');
	            var parent = document.body || document.documentElement;
	            var empty;

	            iframe.style.display = 'none';
	            parent.appendChild(iframe);
	            /* eslint-disable no-script-url */
	            iframe.src = 'javascript:';
	            /* eslint-enable no-script-url */

	            empty = iframe.contentWindow.Object.prototype;
	            parent.removeChild(iframe);
	            iframe = null;

	            return empty;
	        };

	        /* global document */
	        if (supportsProto || typeof document === 'undefined') {
	            createEmpty = function () {
	                return { __proto__: null };
	            };
	        } else {
	            // In old IE __proto__ can't be used to manually set `null`, nor does
	            // any other method exist to make an object that inherits from nothing,
	            // aside from Object.prototype itself. Instead, create a new global
	            // object and *steal* its Object.prototype and strip it bare. This is
	            // used as the prototype to create nullary objects.
	            createEmpty = function () {
	                // Determine which approach to use
	                // see https://github.com/es-shims/es5-shim/issues/150
	                var empty = shouldUseActiveX() ? getEmptyViaActiveX() : getEmptyViaIFrame();

	                delete empty.constructor;
	                delete empty.hasOwnProperty;
	                delete empty.propertyIsEnumerable;
	                delete empty.isPrototypeOf;
	                delete empty.toLocaleString;
	                delete empty.toString;
	                delete empty.valueOf;

	                var Empty = function Empty() {};
	                Empty.prototype = empty;
	                // short-circuit future calls
	                createEmpty = function () {
	                    return new Empty();
	                };
	                return new Empty();
	            };
	        }

	        Object.create = function create(prototype, properties) {

	            var object;
	            var Type = function Type() {}; // An empty constructor.

	            if (prototype === null) {
	                object = createEmpty();
	            } else {
	                if (prototype !== null && isPrimitive(prototype)) {
	                    // In the native implementation `parent` can be `null`
	                    // OR *any* `instanceof Object`  (Object|Function|Array|RegExp|etc)
	                    // Use `typeof` tho, b/c in old IE, DOM elements are not `instanceof Object`
	                    // like they are in modern browsers. Using `Object.create` on DOM elements
	                    // is...err...probably inappropriate, but the native version allows for it.
	                    throw new TypeError('Object prototype may only be an Object or null'); // same msg as Chrome
	                }
	                Type.prototype = prototype;
	                object = new Type();
	                // IE has no built-in implementation of `Object.getPrototypeOf`
	                // neither `__proto__`, but this manually setting `__proto__` will
	                // guarantee that `Object.getPrototypeOf` will work as expected with
	                // objects created using `Object.create`
	                /* eslint-disable no-proto */
	                object.__proto__ = prototype;
	                /* eslint-enable no-proto */
	            }

	            if (properties !== void 0) {
	                Object.defineProperties(object, properties);
	            }

	            return object;
	        };
	    }

	    // ES5 15.2.3.6
	    // http://es5.github.com/#x15.2.3.6

	    // Patch for WebKit and IE8 standard mode
	    // Designed by hax <hax.github.com>
	    // related issue: https://github.com/es-shims/es5-shim/issues#issue/5
	    // IE8 Reference:
	    //     http://msdn.microsoft.com/en-us/library/dd282900.aspx
	    //     http://msdn.microsoft.com/en-us/library/dd229916.aspx
	    // WebKit Bugs:
	    //     https://bugs.webkit.org/show_bug.cgi?id=36423

	    var doesDefinePropertyWork = function doesDefinePropertyWork(object) {
	        try {
	            Object.defineProperty(object, 'sentinel', {});
	            return 'sentinel' in object;
	        } catch (exception) {
	            return false;
	        }
	    };

	    // check whether defineProperty works if it's given. Otherwise,
	    // shim partially.
	    if (Object.defineProperty) {
	        var definePropertyWorksOnObject = doesDefinePropertyWork({});
	        var definePropertyWorksOnDom = typeof document === 'undefined' ||
	            doesDefinePropertyWork(document.createElement('div'));
	        if (!definePropertyWorksOnObject || !definePropertyWorksOnDom) {
	            var definePropertyFallback = Object.defineProperty,
	                definePropertiesFallback = Object.defineProperties;
	        }
	    }

	    if (!Object.defineProperty || definePropertyFallback) {
	        var ERR_NON_OBJECT_DESCRIPTOR = 'Property description must be an object: ';
	        var ERR_NON_OBJECT_TARGET = 'Object.defineProperty called on non-object: ';
	        var ERR_ACCESSORS_NOT_SUPPORTED = 'getters & setters can not be defined on this javascript engine';

	        Object.defineProperty = function defineProperty(object, property, descriptor) {
	            if (isPrimitive(object)) {
	                throw new TypeError(ERR_NON_OBJECT_TARGET + object);
	            }
	            if (isPrimitive(descriptor)) {
	                throw new TypeError(ERR_NON_OBJECT_DESCRIPTOR + descriptor);
	            }
	            // make a valiant attempt to use the real defineProperty
	            // for I8's DOM elements.
	            if (definePropertyFallback) {
	                try {
	                    return definePropertyFallback.call(Object, object, property, descriptor);
	                } catch (exception) {
	                    // try the shim if the real one doesn't work
	                }
	            }

	            // If it's a data property.
	            if ('value' in descriptor) {
	                // fail silently if 'writable', 'enumerable', or 'configurable'
	                // are requested but not supported
	                /*
	                // alternate approach:
	                if ( // can't implement these features; allow false but not true
	                    ('writable' in descriptor && !descriptor.writable) ||
	                    ('enumerable' in descriptor && !descriptor.enumerable) ||
	                    ('configurable' in descriptor && !descriptor.configurable)
	                ))
	                    throw new RangeError(
	                        'This implementation of Object.defineProperty does not support configurable, enumerable, or writable.'
	                    );
	                */

	                if (supportsAccessors && (lookupGetter(object, property) || lookupSetter(object, property))) {
	                    // As accessors are supported only on engines implementing
	                    // `__proto__` we can safely override `__proto__` while defining
	                    // a property to make sure that we don't hit an inherited
	                    // accessor.
	                    /* eslint-disable no-proto */
	                    var prototype = object.__proto__;
	                    object.__proto__ = prototypeOfObject;
	                    // Deleting a property anyway since getter / setter may be
	                    // defined on object itself.
	                    delete object[property];
	                    object[property] = descriptor.value;
	                    // Setting original `__proto__` back now.
	                    object.__proto__ = prototype;
	                    /* eslint-enable no-proto */
	                } else {
	                    object[property] = descriptor.value;
	                }
	            } else {
	                var hasGetter = 'get' in descriptor;
	                var hasSetter = 'set' in descriptor;
	                if (!supportsAccessors && (hasGetter || hasSetter)) {
	                    throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
	                }
	                // If we got that far then getters and setters can be defined !!
	                if (hasGetter) {
	                    defineGetter(object, property, descriptor.get);
	                }
	                if (hasSetter) {
	                    defineSetter(object, property, descriptor.set);
	                }
	            }
	            return object;
	        };
	    }

	    // ES5 15.2.3.7
	    // http://es5.github.com/#x15.2.3.7
	    if (!Object.defineProperties || definePropertiesFallback) {
	        Object.defineProperties = function defineProperties(object, properties) {
	            // make a valiant attempt to use the real defineProperties
	            if (definePropertiesFallback) {
	                try {
	                    return definePropertiesFallback.call(Object, object, properties);
	                } catch (exception) {
	                    // try the shim if the real one doesn't work
	                }
	            }

	            Object.keys(properties).forEach(function (property) {
	                if (property !== '__proto__') {
	                    Object.defineProperty(object, property, properties[property]);
	                }
	            });
	            return object;
	        };
	    }

	    // ES5 15.2.3.8
	    // http://es5.github.com/#x15.2.3.8
	    if (!Object.seal) {
	        Object.seal = function seal(object) {
	            if (Object(object) !== object) {
	                throw new TypeError('Object.seal can only be called on Objects.');
	            }
	            // this is misleading and breaks feature-detection, but
	            // allows "securable" code to "gracefully" degrade to working
	            // but insecure code.
	            return object;
	        };
	    }

	    // ES5 15.2.3.9
	    // http://es5.github.com/#x15.2.3.9
	    if (!Object.freeze) {
	        Object.freeze = function freeze(object) {
	            if (Object(object) !== object) {
	                throw new TypeError('Object.freeze can only be called on Objects.');
	            }
	            // this is misleading and breaks feature-detection, but
	            // allows "securable" code to "gracefully" degrade to working
	            // but insecure code.
	            return object;
	        };
	    }

	    // detect a Rhino bug and patch it
	    try {
	        Object.freeze(function () {});
	    } catch (exception) {
	        Object.freeze = (function (freezeObject) {
	            return function freeze(object) {
	                if (typeof object === 'function') {
	                    return object;
	                } else {
	                    return freezeObject(object);
	                }
	            };
	        }(Object.freeze));
	    }

	    // ES5 15.2.3.10
	    // http://es5.github.com/#x15.2.3.10
	    if (!Object.preventExtensions) {
	        Object.preventExtensions = function preventExtensions(object) {
	            if (Object(object) !== object) {
	                throw new TypeError('Object.preventExtensions can only be called on Objects.');
	            }
	            // this is misleading and breaks feature-detection, but
	            // allows "securable" code to "gracefully" degrade to working
	            // but insecure code.
	            return object;
	        };
	    }

	    // ES5 15.2.3.11
	    // http://es5.github.com/#x15.2.3.11
	    if (!Object.isSealed) {
	        Object.isSealed = function isSealed(object) {
	            if (Object(object) !== object) {
	                throw new TypeError('Object.isSealed can only be called on Objects.');
	            }
	            return false;
	        };
	    }

	    // ES5 15.2.3.12
	    // http://es5.github.com/#x15.2.3.12
	    if (!Object.isFrozen) {
	        Object.isFrozen = function isFrozen(object) {
	            if (Object(object) !== object) {
	                throw new TypeError('Object.isFrozen can only be called on Objects.');
	            }
	            return false;
	        };
	    }

	    // ES5 15.2.3.13
	    // http://es5.github.com/#x15.2.3.13
	    if (!Object.isExtensible) {
	        Object.isExtensible = function isExtensible(object) {
	            // 1. If Type(O) is not Object throw a TypeError exception.
	            if (Object(object) !== object) {
	                throw new TypeError('Object.isExtensible can only be called on Objects.');
	            }
	            // 2. Return the Boolean value of the [[Extensible]] internal property of O.
	            var name = '';
	            while (owns(object, name)) {
	                name += '?';
	            }
	            object[name] = true;
	            var returnValue = owns(object, name);
	            delete object[name];
	            return returnValue;
	        };
	    }

	}));


/***/ },

/***/ 3:
/***/ function(module, exports) {

	// Console-polyfill. MIT license.
	// https://github.com/paulmillr/console-polyfill
	// Make it safe to do console.log() always.
	(function(global) {
	  'use strict';
	  if (!global.console) {
	    global.console = {};
	  }
	  var con = global.console;
	  var prop, method;
	  var dummy = function() {};
	  var properties = ['memory'];
	  var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
	     'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
	     'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
	  while (prop = properties.pop()) if (!con[prop]) con[prop] = {};
	  while (method = methods.pop()) if (typeof con[method] !== 'function') con[method] = dummy;
	  // Using `this` for web workers & supports Browserify / Webpack.
	})(typeof window === 'undefined' ? this : window);


/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	var require;/* WEBPACK VAR INJECTION */(function(process, global) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   3.3.1
	 */

	(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    (global.ES6Promise = factory());
	}(this, (function () { 'use strict';

	function objectOrFunction(x) {
	  return typeof x === 'function' || typeof x === 'object' && x !== null;
	}

	function isFunction(x) {
	  return typeof x === 'function';
	}

	var _isArray = undefined;
	if (!Array.isArray) {
	  _isArray = function (x) {
	    return Object.prototype.toString.call(x) === '[object Array]';
	  };
	} else {
	  _isArray = Array.isArray;
	}

	var isArray = _isArray;

	var len = 0;
	var vertxNext = undefined;
	var customSchedulerFn = undefined;

	var asap = function asap(callback, arg) {
	  queue[len] = callback;
	  queue[len + 1] = arg;
	  len += 2;
	  if (len === 2) {
	    // If len is 2, that means that we need to schedule an async flush.
	    // If additional callbacks are queued before the queue is flushed, they
	    // will be processed by this flush that we are scheduling.
	    if (customSchedulerFn) {
	      customSchedulerFn(flush);
	    } else {
	      scheduleFlush();
	    }
	  }
	};

	function setScheduler(scheduleFn) {
	  customSchedulerFn = scheduleFn;
	}

	function setAsap(asapFn) {
	  asap = asapFn;
	}

	var browserWindow = typeof window !== 'undefined' ? window : undefined;
	var browserGlobal = browserWindow || {};
	var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

	// test for web worker but not in IE10
	var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

	// node
	function useNextTick() {
	  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	  // see https://github.com/cujojs/when/issues/410 for details
	  return function () {
	    return process.nextTick(flush);
	  };
	}

	// vertx
	function useVertxTimer() {
	  return function () {
	    vertxNext(flush);
	  };
	}

	function useMutationObserver() {
	  var iterations = 0;
	  var observer = new BrowserMutationObserver(flush);
	  var node = document.createTextNode('');
	  observer.observe(node, { characterData: true });

	  return function () {
	    node.data = iterations = ++iterations % 2;
	  };
	}

	// web worker
	function useMessageChannel() {
	  var channel = new MessageChannel();
	  channel.port1.onmessage = flush;
	  return function () {
	    return channel.port2.postMessage(0);
	  };
	}

	function useSetTimeout() {
	  // Store setTimeout reference so es6-promise will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var globalSetTimeout = setTimeout;
	  return function () {
	    return globalSetTimeout(flush, 1);
	  };
	}

	var queue = new Array(1000);
	function flush() {
	  for (var i = 0; i < len; i += 2) {
	    var callback = queue[i];
	    var arg = queue[i + 1];

	    callback(arg);

	    queue[i] = undefined;
	    queue[i + 1] = undefined;
	  }

	  len = 0;
	}

	function attemptVertx() {
	  try {
	    var r = require;
	    var vertx = __webpack_require__(6);
	    vertxNext = vertx.runOnLoop || vertx.runOnContext;
	    return useVertxTimer();
	  } catch (e) {
	    return useSetTimeout();
	  }
	}

	var scheduleFlush = undefined;
	// Decide what async method to use to triggering processing of queued callbacks:
	if (isNode) {
	  scheduleFlush = useNextTick();
	} else if (BrowserMutationObserver) {
	  scheduleFlush = useMutationObserver();
	} else if (isWorker) {
	  scheduleFlush = useMessageChannel();
	} else if (browserWindow === undefined && "function" === 'function') {
	  scheduleFlush = attemptVertx();
	} else {
	  scheduleFlush = useSetTimeout();
	}

	function then(onFulfillment, onRejection) {
	  var _arguments = arguments;

	  var parent = this;

	  var child = new this.constructor(noop);

	  if (child[PROMISE_ID] === undefined) {
	    makePromise(child);
	  }

	  var _state = parent._state;

	  if (_state) {
	    (function () {
	      var callback = _arguments[_state - 1];
	      asap(function () {
	        return invokeCallback(_state, child, callback, parent._result);
	      });
	    })();
	  } else {
	    subscribe(parent, child, onFulfillment, onRejection);
	  }

	  return child;
	}

	/**
	  `Promise.resolve` returns a promise that will become resolved with the
	  passed `value`. It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    resolve(1);
	  });

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.resolve(1);

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  @method resolve
	  @static
	  @param {Any} value value that the returned promise will be resolved with
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
	function resolve(object) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (object && typeof object === 'object' && object.constructor === Constructor) {
	    return object;
	  }

	  var promise = new Constructor(noop);
	  _resolve(promise, object);
	  return promise;
	}

	var PROMISE_ID = Math.random().toString(36).substring(16);

	function noop() {}

	var PENDING = void 0;
	var FULFILLED = 1;
	var REJECTED = 2;

	var GET_THEN_ERROR = new ErrorObject();

	function selfFulfillment() {
	  return new TypeError("You cannot resolve a promise with itself");
	}

	function cannotReturnOwn() {
	  return new TypeError('A promises callback cannot return that same promise.');
	}

	function getThen(promise) {
	  try {
	    return promise.then;
	  } catch (error) {
	    GET_THEN_ERROR.error = error;
	    return GET_THEN_ERROR;
	  }
	}

	function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	  try {
	    then.call(value, fulfillmentHandler, rejectionHandler);
	  } catch (e) {
	    return e;
	  }
	}

	function handleForeignThenable(promise, thenable, then) {
	  asap(function (promise) {
	    var sealed = false;
	    var error = tryThen(then, thenable, function (value) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	      if (thenable !== value) {
	        _resolve(promise, value);
	      } else {
	        fulfill(promise, value);
	      }
	    }, function (reason) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;

	      _reject(promise, reason);
	    }, 'Settle: ' + (promise._label || ' unknown promise'));

	    if (!sealed && error) {
	      sealed = true;
	      _reject(promise, error);
	    }
	  }, promise);
	}

	function handleOwnThenable(promise, thenable) {
	  if (thenable._state === FULFILLED) {
	    fulfill(promise, thenable._result);
	  } else if (thenable._state === REJECTED) {
	    _reject(promise, thenable._result);
	  } else {
	    subscribe(thenable, undefined, function (value) {
	      return _resolve(promise, value);
	    }, function (reason) {
	      return _reject(promise, reason);
	    });
	  }
	}

	function handleMaybeThenable(promise, maybeThenable, then$$) {
	  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
	    handleOwnThenable(promise, maybeThenable);
	  } else {
	    if (then$$ === GET_THEN_ERROR) {
	      _reject(promise, GET_THEN_ERROR.error);
	    } else if (then$$ === undefined) {
	      fulfill(promise, maybeThenable);
	    } else if (isFunction(then$$)) {
	      handleForeignThenable(promise, maybeThenable, then$$);
	    } else {
	      fulfill(promise, maybeThenable);
	    }
	  }
	}

	function _resolve(promise, value) {
	  if (promise === value) {
	    _reject(promise, selfFulfillment());
	  } else if (objectOrFunction(value)) {
	    handleMaybeThenable(promise, value, getThen(value));
	  } else {
	    fulfill(promise, value);
	  }
	}

	function publishRejection(promise) {
	  if (promise._onerror) {
	    promise._onerror(promise._result);
	  }

	  publish(promise);
	}

	function fulfill(promise, value) {
	  if (promise._state !== PENDING) {
	    return;
	  }

	  promise._result = value;
	  promise._state = FULFILLED;

	  if (promise._subscribers.length !== 0) {
	    asap(publish, promise);
	  }
	}

	function _reject(promise, reason) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	  promise._state = REJECTED;
	  promise._result = reason;

	  asap(publishRejection, promise);
	}

	function subscribe(parent, child, onFulfillment, onRejection) {
	  var _subscribers = parent._subscribers;
	  var length = _subscribers.length;

	  parent._onerror = null;

	  _subscribers[length] = child;
	  _subscribers[length + FULFILLED] = onFulfillment;
	  _subscribers[length + REJECTED] = onRejection;

	  if (length === 0 && parent._state) {
	    asap(publish, parent);
	  }
	}

	function publish(promise) {
	  var subscribers = promise._subscribers;
	  var settled = promise._state;

	  if (subscribers.length === 0) {
	    return;
	  }

	  var child = undefined,
	      callback = undefined,
	      detail = promise._result;

	  for (var i = 0; i < subscribers.length; i += 3) {
	    child = subscribers[i];
	    callback = subscribers[i + settled];

	    if (child) {
	      invokeCallback(settled, child, callback, detail);
	    } else {
	      callback(detail);
	    }
	  }

	  promise._subscribers.length = 0;
	}

	function ErrorObject() {
	  this.error = null;
	}

	var TRY_CATCH_ERROR = new ErrorObject();

	function tryCatch(callback, detail) {
	  try {
	    return callback(detail);
	  } catch (e) {
	    TRY_CATCH_ERROR.error = e;
	    return TRY_CATCH_ERROR;
	  }
	}

	function invokeCallback(settled, promise, callback, detail) {
	  var hasCallback = isFunction(callback),
	      value = undefined,
	      error = undefined,
	      succeeded = undefined,
	      failed = undefined;

	  if (hasCallback) {
	    value = tryCatch(callback, detail);

	    if (value === TRY_CATCH_ERROR) {
	      failed = true;
	      error = value.error;
	      value = null;
	    } else {
	      succeeded = true;
	    }

	    if (promise === value) {
	      _reject(promise, cannotReturnOwn());
	      return;
	    }
	  } else {
	    value = detail;
	    succeeded = true;
	  }

	  if (promise._state !== PENDING) {
	    // noop
	  } else if (hasCallback && succeeded) {
	      _resolve(promise, value);
	    } else if (failed) {
	      _reject(promise, error);
	    } else if (settled === FULFILLED) {
	      fulfill(promise, value);
	    } else if (settled === REJECTED) {
	      _reject(promise, value);
	    }
	}

	function initializePromise(promise, resolver) {
	  try {
	    resolver(function resolvePromise(value) {
	      _resolve(promise, value);
	    }, function rejectPromise(reason) {
	      _reject(promise, reason);
	    });
	  } catch (e) {
	    _reject(promise, e);
	  }
	}

	var id = 0;
	function nextId() {
	  return id++;
	}

	function makePromise(promise) {
	  promise[PROMISE_ID] = id++;
	  promise._state = undefined;
	  promise._result = undefined;
	  promise._subscribers = [];
	}

	function Enumerator(Constructor, input) {
	  this._instanceConstructor = Constructor;
	  this.promise = new Constructor(noop);

	  if (!this.promise[PROMISE_ID]) {
	    makePromise(this.promise);
	  }

	  if (isArray(input)) {
	    this._input = input;
	    this.length = input.length;
	    this._remaining = input.length;

	    this._result = new Array(this.length);

	    if (this.length === 0) {
	      fulfill(this.promise, this._result);
	    } else {
	      this.length = this.length || 0;
	      this._enumerate();
	      if (this._remaining === 0) {
	        fulfill(this.promise, this._result);
	      }
	    }
	  } else {
	    _reject(this.promise, validationError());
	  }
	}

	function validationError() {
	  return new Error('Array Methods must be provided an Array');
	};

	Enumerator.prototype._enumerate = function () {
	  var length = this.length;
	  var _input = this._input;

	  for (var i = 0; this._state === PENDING && i < length; i++) {
	    this._eachEntry(_input[i], i);
	  }
	};

	Enumerator.prototype._eachEntry = function (entry, i) {
	  var c = this._instanceConstructor;
	  var resolve$$ = c.resolve;

	  if (resolve$$ === resolve) {
	    var _then = getThen(entry);

	    if (_then === then && entry._state !== PENDING) {
	      this._settledAt(entry._state, i, entry._result);
	    } else if (typeof _then !== 'function') {
	      this._remaining--;
	      this._result[i] = entry;
	    } else if (c === Promise) {
	      var promise = new c(noop);
	      handleMaybeThenable(promise, entry, _then);
	      this._willSettleAt(promise, i);
	    } else {
	      this._willSettleAt(new c(function (resolve$$) {
	        return resolve$$(entry);
	      }), i);
	    }
	  } else {
	    this._willSettleAt(resolve$$(entry), i);
	  }
	};

	Enumerator.prototype._settledAt = function (state, i, value) {
	  var promise = this.promise;

	  if (promise._state === PENDING) {
	    this._remaining--;

	    if (state === REJECTED) {
	      _reject(promise, value);
	    } else {
	      this._result[i] = value;
	    }
	  }

	  if (this._remaining === 0) {
	    fulfill(promise, this._result);
	  }
	};

	Enumerator.prototype._willSettleAt = function (promise, i) {
	  var enumerator = this;

	  subscribe(promise, undefined, function (value) {
	    return enumerator._settledAt(FULFILLED, i, value);
	  }, function (reason) {
	    return enumerator._settledAt(REJECTED, i, reason);
	  });
	};

	/**
	  `Promise.all` accepts an array of promises, and returns a new promise which
	  is fulfilled with an array of fulfillment values for the passed promises, or
	  rejected with the reason of the first passed promise to be rejected. It casts all
	  elements of the passed iterable to promises as it runs this algorithm.

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = resolve(2);
	  let promise3 = resolve(3);
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
	    // The array here would be [ 1, 2, 3 ];
	  });
	  ```

	  If any of the `promises` given to `all` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promises's
	  rejection handler. For example:

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = reject(new Error("2"));
	  let promise3 = reject(new Error("3"));
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(error) {
	    // error.message === "2"
	  });
	  ```

	  @method all
	  @static
	  @param {Array} entries array of promises
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when all `promises` have been
	  fulfilled, or rejected if any of them become rejected.
	  @static
	*/
	function all(entries) {
	  return new Enumerator(this, entries).promise;
	}

	/**
	  `Promise.race` returns a new promise which is settled in the same way as the
	  first passed promise to settle.

	  Example:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 2');
	    }, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
	    // result === 'promise 2' because it was resolved before promise1
	    // was resolved.
	  });
	  ```

	  `Promise.race` is deterministic in that only the state of the first
	  settled promise matters. For example, even if other promises given to the
	  `promises` array argument are resolved, but the first settled promise has
	  become rejected before the other promises became fulfilled, the returned
	  promise will become rejected:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      reject(new Error('promise 2'));
	    }, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
	    // Code here never runs
	  }, function(reason){
	    // reason.message === 'promise 2' because promise 2 became rejected before
	    // promise 1 became fulfilled
	  });
	  ```

	  An example real-world use case is implementing timeouts:

	  ```javascript
	  Promise.race([ajax('foo.json'), timeout(5000)])
	  ```

	  @method race
	  @static
	  @param {Array} promises array of promises to observe
	  Useful for tooling.
	  @return {Promise} a promise which settles in the same way as the first passed
	  promise to settle.
	*/
	function race(entries) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (!isArray(entries)) {
	    return new Constructor(function (_, reject) {
	      return reject(new TypeError('You must pass an array to race.'));
	    });
	  } else {
	    return new Constructor(function (resolve, reject) {
	      var length = entries.length;
	      for (var i = 0; i < length; i++) {
	        Constructor.resolve(entries[i]).then(resolve, reject);
	      }
	    });
	  }
	}

	/**
	  `Promise.reject` returns a promise rejected with the passed `reason`.
	  It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    reject(new Error('WHOOPS'));
	  });

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.reject(new Error('WHOOPS'));

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  @method reject
	  @static
	  @param {Any} reason value that the returned promise will be rejected with.
	  Useful for tooling.
	  @return {Promise} a promise rejected with the given `reason`.
	*/
	function reject(reason) {
	  /*jshint validthis:true */
	  var Constructor = this;
	  var promise = new Constructor(noop);
	  _reject(promise, reason);
	  return promise;
	}

	function needsResolver() {
	  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	}

	function needsNew() {
	  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	}

	/**
	  Promise objects represent the eventual result of an asynchronous operation. The
	  primary way of interacting with a promise is through its `then` method, which
	  registers callbacks to receive either a promise's eventual value or the reason
	  why the promise cannot be fulfilled.

	  Terminology
	  -----------

	  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	  - `thenable` is an object or function that defines a `then` method.
	  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	  - `exception` is a value that is thrown using the throw statement.
	  - `reason` is a value that indicates why a promise was rejected.
	  - `settled` the final resting state of a promise, fulfilled or rejected.

	  A promise can be in one of three states: pending, fulfilled, or rejected.

	  Promises that are fulfilled have a fulfillment value and are in the fulfilled
	  state.  Promises that are rejected have a rejection reason and are in the
	  rejected state.  A fulfillment value is never a thenable.

	  Promises can also be said to *resolve* a value.  If this value is also a
	  promise, then the original promise's settled state will match the value's
	  settled state.  So a promise that *resolves* a promise that rejects will
	  itself reject, and a promise that *resolves* a promise that fulfills will
	  itself fulfill.


	  Basic Usage:
	  ------------

	  ```js
	  let promise = new Promise(function(resolve, reject) {
	    // on success
	    resolve(value);

	    // on failure
	    reject(reason);
	  });

	  promise.then(function(value) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Advanced Usage:
	  ---------------

	  Promises shine when abstracting away asynchronous interactions such as
	  `XMLHttpRequest`s.

	  ```js
	  function getJSON(url) {
	    return new Promise(function(resolve, reject){
	      let xhr = new XMLHttpRequest();

	      xhr.open('GET', url);
	      xhr.onreadystatechange = handler;
	      xhr.responseType = 'json';
	      xhr.setRequestHeader('Accept', 'application/json');
	      xhr.send();

	      function handler() {
	        if (this.readyState === this.DONE) {
	          if (this.status === 200) {
	            resolve(this.response);
	          } else {
	            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	          }
	        }
	      };
	    });
	  }

	  getJSON('/posts.json').then(function(json) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Unlike callbacks, promises are great composable primitives.

	  ```js
	  Promise.all([
	    getJSON('/posts'),
	    getJSON('/comments')
	  ]).then(function(values){
	    values[0] // => postsJSON
	    values[1] // => commentsJSON

	    return values;
	  });
	  ```

	  @class Promise
	  @param {function} resolver
	  Useful for tooling.
	  @constructor
	*/
	function Promise(resolver) {
	  this[PROMISE_ID] = nextId();
	  this._result = this._state = undefined;
	  this._subscribers = [];

	  if (noop !== resolver) {
	    typeof resolver !== 'function' && needsResolver();
	    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
	  }
	}

	Promise.all = all;
	Promise.race = race;
	Promise.resolve = resolve;
	Promise.reject = reject;
	Promise._setScheduler = setScheduler;
	Promise._setAsap = setAsap;
	Promise._asap = asap;

	Promise.prototype = {
	  constructor: Promise,

	  /**
	    The primary way of interacting with a promise is through its `then` method,
	    which registers callbacks to receive either a promise's eventual value or the
	    reason why the promise cannot be fulfilled.
	  
	    ```js
	    findUser().then(function(user){
	      // user is available
	    }, function(reason){
	      // user is unavailable, and you are given the reason why
	    });
	    ```
	  
	    Chaining
	    --------
	  
	    The return value of `then` is itself a promise.  This second, 'downstream'
	    promise is resolved with the return value of the first promise's fulfillment
	    or rejection handler, or rejected if the handler throws an exception.
	  
	    ```js
	    findUser().then(function (user) {
	      return user.name;
	    }, function (reason) {
	      return 'default name';
	    }).then(function (userName) {
	      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	      // will be `'default name'`
	    });
	  
	    findUser().then(function (user) {
	      throw new Error('Found user, but still unhappy');
	    }, function (reason) {
	      throw new Error('`findUser` rejected and we're unhappy');
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	    });
	    ```
	    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	  
	    ```js
	    findUser().then(function (user) {
	      throw new PedagogicalException('Upstream error');
	    }).then(function (value) {
	      // never reached
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // The `PedgagocialException` is propagated all the way down to here
	    });
	    ```
	  
	    Assimilation
	    ------------
	  
	    Sometimes the value you want to propagate to a downstream promise can only be
	    retrieved asynchronously. This can be achieved by returning a promise in the
	    fulfillment or rejection handler. The downstream promise will then be pending
	    until the returned promise is settled. This is called *assimilation*.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // The user's comments are now available
	    });
	    ```
	  
	    If the assimliated promise rejects, then the downstream promise will also reject.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // If `findCommentsByAuthor` fulfills, we'll have the value here
	    }, function (reason) {
	      // If `findCommentsByAuthor` rejects, we'll have the reason here
	    });
	    ```
	  
	    Simple Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let result;
	  
	    try {
	      result = findResult();
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	    findResult(function(result, err){
	      if (err) {
	        // failure
	      } else {
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findResult().then(function(result){
	      // success
	    }, function(reason){
	      // failure
	    });
	    ```
	  
	    Advanced Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let author, books;
	  
	    try {
	      author = findAuthor();
	      books  = findBooksByAuthor(author);
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	  
	    function foundBooks(books) {
	  
	    }
	  
	    function failure(reason) {
	  
	    }
	  
	    findAuthor(function(author, err){
	      if (err) {
	        failure(err);
	        // failure
	      } else {
	        try {
	          findBoooksByAuthor(author, function(books, err) {
	            if (err) {
	              failure(err);
	            } else {
	              try {
	                foundBooks(books);
	              } catch(reason) {
	                failure(reason);
	              }
	            }
	          });
	        } catch(error) {
	          failure(err);
	        }
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findAuthor().
	      then(findBooksByAuthor).
	      then(function(books){
	        // found books
	    }).catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method then
	    @param {Function} onFulfilled
	    @param {Function} onRejected
	    Useful for tooling.
	    @return {Promise}
	  */
	  then: then,

	  /**
	    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	    as the catch block of a try/catch statement.
	  
	    ```js
	    function findAuthor(){
	      throw new Error('couldn't find that author');
	    }
	  
	    // synchronous
	    try {
	      findAuthor();
	    } catch(reason) {
	      // something went wrong
	    }
	  
	    // async with promises
	    findAuthor().catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method catch
	    @param {Function} onRejection
	    Useful for tooling.
	    @return {Promise}
	  */
	  'catch': function _catch(onRejection) {
	    return this.then(null, onRejection);
	  }
	};

	function polyfill() {
	    var local = undefined;

	    if (typeof global !== 'undefined') {
	        local = global;
	    } else if (typeof self !== 'undefined') {
	        local = self;
	    } else {
	        try {
	            local = Function('return this')();
	        } catch (e) {
	            throw new Error('polyfill failed because global object is unavailable in this environment');
	        }
	    }

	    var P = local.Promise;

	    if (P) {
	        var promiseToString = null;
	        try {
	            promiseToString = Object.prototype.toString.call(P.resolve());
	        } catch (e) {
	            // silently ignored
	        }

	        if (promiseToString === '[object Promise]' && !P.cast) {
	            return;
	        }
	    }

	    local.Promise = Promise;
	}

	polyfill();
	// Strange compat..
	Promise.polyfill = polyfill;
	Promise.Promise = Promise;

	return Promise;

	})));
	//# sourceMappingURL=es6-promise.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5), (function() { return this; }())))

/***/ },

/***/ 6:
/***/ function(module, exports) {

	/* (ignored) */

/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(8);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(164);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// 单选框组件
	var BlueMUI_Radio = function (_React$Component) {
		_inherits(BlueMUI_Radio, _React$Component);

		function BlueMUI_Radio(props) {
			_classCallCheck(this, BlueMUI_Radio);

			var _this = _possibleConstructorReturn(this, (BlueMUI_Radio.__proto__ || Object.getPrototypeOf(BlueMUI_Radio)).call(this, props));

			_this._onclick = _this._onclick.bind(_this);
			_this.state = {
				selected: false
			};
			return _this;
		}

		_createClass(BlueMUI_Radio, [{
			key: '_onclick',
			value: function _onclick(e) {
				this.props.callback();
				this.setState(function (prevState) {
					return {
						selected: !prevState.selected
					};
				});
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2["default"].createElement(
					'div',
					{ className: 'BlueMUI_Radio' },
					_react2["default"].createElement(
						'span',
						{ className: 'name' },
						this.props.name
					),
					_react2["default"].createElement('span', { onClick: this._onclick,
						className: this.state.selected ? "radio selected" : 'radio'
					})
				);
			}
		}]);

		return BlueMUI_Radio;
	}(_react2["default"].Component);

	var BluMUI_List = function (_React$Component2) {
		_inherits(BluMUI_List, _React$Component2);

		function BluMUI_List(props) {
			_classCallCheck(this, BluMUI_List);

			var _this2 = _possibleConstructorReturn(this, (BluMUI_List.__proto__ || Object.getPrototypeOf(BluMUI_List)).call(this, props));

			_this2.state = {
				index: _this2.props.index
			};
			_this2._onClick = _this2._onClick.bind(_this2);
			return _this2;
		}

		_createClass(BluMUI_List, [{
			key: '_onClick',
			value: function _onClick(index, item) {
				var that = this;
				if (item.callback) return function () {
					that.setState({
						index: index
					});
					item.callback(that.props.ajaxName, index, that, 1, that.props.items);
				};
			}
		}, {
			key: '_createLi',
			value: function _createLi() {
				var result = [],
				    i,
				    len,
				    items = this.props.items;
				for (i = 0, len = items.length; i < len; i++) {
					result.push(_react2["default"].createElement(
						'li',
						{ key: i,
							className: this.state.index == i ? 'selected index' + i : 'index' + i,
							'data-key': i },
						items[i].url && _react2["default"].createElement(
							'a',
							{ title: items[i].value,
								href: items[i].url,
								target: '_blank',
								onClick: this._onClick(i, items[i])
							},
							items[i].value
						) || _react2["default"].createElement(
							'a',
							{ title: items[i].value,
								onClick: this._onClick(i, items[i])
							},
							items[i].value
						)
					));
				}
				return result;
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2["default"].createElement(
					'ul',
					{ id: this.props.id, className: "BluMUI_List " + this.props.extClass },
					this._createLi()
				);
			}
		}]);

		return BluMUI_List;
	}(_react2["default"].Component);

	var BluMUI_SimpleDrop = function (_React$Component3) {
		_inherits(BluMUI_SimpleDrop, _React$Component3);

		function BluMUI_SimpleDrop(props) {
			_classCallCheck(this, BluMUI_SimpleDrop);

			var _this3 = _possibleConstructorReturn(this, (BluMUI_SimpleDrop.__proto__ || Object.getPrototypeOf(BluMUI_SimpleDrop)).call(this, props));

			_this3.state = {
				selectedValue: '',
				selected: _this3.props.initalSelected,
				open: false
			};
			_this3._onClick = _this3._onClick.bind(_this3);
			_this3._open = _this3._open.bind(_this3);
			return _this3;
		}

		_createClass(BluMUI_SimpleDrop, [{
			key: '_open',
			value: function _open() {
				this.setState(function (prevState, props) {
					return {
						open: !prevState.open
					};
				});
			}
		}, {
			key: '_createIitem',
			value: function _createIitem() {
				var result = [],
				    i,
				    len;
				for (i = 0, len = this.props.items.length; i < len; i++) {
					result.push(_react2["default"].createElement(
						'li',
						{ key: i,
							onClick: this._onClick(this.props.items[i])
						},
						this.props.items[i]
					));
				}
				return result;
			}
		}, {
			key: '_onClick',
			value: function _onClick(value) {
				var that = this;
				return function () {
					that.setState(function (prevState, props) {
						return {
							open: !prevState.open,
							selected: value,
							selectedValue: value
						};
					});
					if (that.props.callback) that.props.callback(value);
				};
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2["default"].createElement(
					'div',
					{ className: "BluMUI_SimpleDrop " + this.props.extClass,
						id: this.props.id
					},
					_react2["default"].createElement(
						'span',
						{ className: 'selected',
							'data-value': this.state.selected,
							onClick: this._open },
						this.state.selected
					),
					_react2["default"].createElement(
						'ul',
						{ className: this.state.open ? "selectArea" : "noSelectArea"
						},
						this._createIitem()
					),
					_react2["default"].createElement('input', { type: 'hidden',
						value: this.state.selectedValue,
						id: this.props.name
					})
				);
			}
		}]);

		return BluMUI_SimpleDrop;
	}(_react2["default"].Component);

	var BluMUI_Table = function (_React$Component4) {
		_inherits(BluMUI_Table, _React$Component4);

		function BluMUI_Table(props) {
			_classCallCheck(this, BluMUI_Table);

			var _this4 = _possibleConstructorReturn(this, (BluMUI_Table.__proto__ || Object.getPrototypeOf(BluMUI_Table)).call(this, props));

			_this4._onClick = _this4._onClick.bind(_this4);
			return _this4;
		}

		_createClass(BluMUI_Table, [{
			key: '_onClick',
			value: function _onClick(item, that, i) {
				var that = this;
				if (item.callback) {
					return function () {
						item.callback(that.props.ajaxName, i, that, 0);
					};
				}
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				this.setState({
					items: nextProps.items
				});
			}
		}, {
			key: '_create',
			value: function _create() {
				var _this5 = this;

				var result = [],
				    i,
				    items = this.props.items,
				    len;
				for (i = 0, len = items.length; i < len; i++) {
					result.push(_react2["default"].createElement(
						'tr',
						{ key: i, className: i == 0 ? 'thead' : 'tbody' },
						items[i].map(function (value, index) {
							return _react2["default"].createElement(
								'td',
								{ key: index,
									className: "td" + index
								},
								value.url && _react2["default"].createElement(
									'a',
									{ href: value.url, onClick: _this5._onClick(value, _this5, i) },
									value.value
								),
								!value.url && _react2["default"].createElement(
									'a',
									{ onClick: _this5._onClick(value, _this5, i) },
									value.value
								)
							);
						})
					));
				}
				return result;
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2["default"].createElement(
					'table',
					{ className: 'BluMUI_Table ' + this.props.extClass,
						id: this.props.id
					},
					_react2["default"].createElement(
						'tbody',
						null,
						this._create()
					)
				);
			}
		}]);

		return BluMUI_Table;
	}(_react2["default"].Component);

	var BluMUI_FileUp = function (_React$Component5) {
		_inherits(BluMUI_FileUp, _React$Component5);

		function BluMUI_FileUp(props) {
			_classCallCheck(this, BluMUI_FileUp);

			var _this6 = _possibleConstructorReturn(this, (BluMUI_FileUp.__proto__ || Object.getPrototypeOf(BluMUI_FileUp)).call(this, props));

			_this6._warn = _this6._warn.bind(_this6);
			return _this6;
		}

		_createClass(BluMUI_FileUp, [{
			key: '_warn',
			value: function _warn(e) {
				var value = e.target.value,
				    warn;
				console.log(value, 9999);
				if (value) {
					warn = value;
				} else {
					warn = '没选择文件';
				}
				console.log(warn, 231);
				this.warnBox.innerHTML = warn;
			}
		}, {
			key: 'render',
			value: function render() {
				var _this7 = this;

				return _react2["default"].createElement(
					'div',
					{ className: 'BluMUI_FileUp' },
					_react2["default"].createElement(
						'div',
						{ className: 'fileArea' },
						_react2["default"].createElement(
							'div',
							{ className: 'fileInput' },
							_react2["default"].createElement(
								'span',
								null,
								'\u9009\u62E9\u6587\u4EF6'
							),
							_react2["default"].createElement('input', { type: 'file',
								id: this.props.fileId,
								name: this.props.fileFormName,
								onChange: this._warn
							})
						),
						_react2["default"].createElement(
							'span',
							{ ref: function ref(warnBox) {
									return _this7.warnBox = warnBox;
								}, className: 'warn', id: this.props.warnId || "warn" },
							'\u672A\u9009\u62E9\u6587\u4EF6'
						)
					)
				);
			}
		}]);

		return BluMUI_FileUp;
	}(_react2["default"].Component);

	var BluMUI_classItru = function (_React$Component6) {
		_inherits(BluMUI_classItru, _React$Component6);

		function BluMUI_classItru(props) {
			_classCallCheck(this, BluMUI_classItru);

			var _this8 = _possibleConstructorReturn(this, (BluMUI_classItru.__proto__ || Object.getPrototypeOf(BluMUI_classItru)).call(this, props));

			_this8.state = {
				fileName: _this8.props.fileName || '',
				editor: null
			};
			_this8._upLoad = _this8._upLoad.bind(_this8);
			_this8._save = _this8._save.bind(_this8);
			return _this8;
		}

		_createClass(BluMUI_classItru, [{
			key: '_upLoad',
			value: function _upLoad() {
				this.props.uploadFile(this.file.files, 'Itru', this.img, this);
			}
		}, {
			key: '_save',
			value: function _save() {
				var contentText = this.state.editor.getContentTxt();
				var data = {
					picName: {
						value: this.state.fileName
					},
					introduction: {
						value: contentText,
						checkValue: contentText,
						pattern: /\S{1,}/
					},
					introductionHtml: {
						value: this.state.editor.getContent()
					}
				};
				this.props.saveAjax(data, this.props.ajaxName, this);
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				var that = this,
				    editor = this.state.editor;
				if (editor) {
					editor.render(document.getElementById('editor'));
				} else {
					editor = this.state.editor = new UE.ui.Editor();
					editor.render(document.getElementById('editor'));
				}
				editor.addListener('ready', function () {
					if (that.props.html) {
						editor.setContent(that.props.html);
					}
					if (!that.props.isPass) {
						editor.setDisabled('fullscreen');
					}
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var _this9 = this;

				return _react2["default"].createElement(
					'div',
					{ id: this.props.id },
					_react2["default"].createElement(
						'div',
						null,
						_react2["default"].createElement(
							'span',
							{ className: 'title' },
							'\u8BFE\u7A0B\u7B80\u4ECB'
						)
					),
					_react2["default"].createElement(
						'div',
						{ className: 'Item', id: 'surface' },
						_react2["default"].createElement(
							'span',
							{ className: 'itemNameM' },
							'\u8BFE\u7A0B\u5C01\u9762'
						),
						_react2["default"].createElement(
							'div',
							{ className: 'fileArea' },
							_react2["default"].createElement('img', { className: 'fileInput', ref: function ref(img) {
									return _this9.img = img;
								}, src: this.props.tpurl }),
							this.props.isPass && _react2["default"].createElement(
								'span',
								null,
								'(\u5EFA\u8BAE\u4E0A\u4F20\u957F\u5BBD\u6BD4\u4F8B\u4E3A1:1\u7684\u56FE\u7247)'
							)
						),
						this.props.isPass && _react2["default"].createElement(
							'button',
							{ className: 'fileUp activeBtn' },
							_react2["default"].createElement('input', { type: 'file',
								name: 'file',
								id: 'faceImg',
								onChange: this._upLoad,
								ref: function ref(file) {
									_this9.file = file;
								}
							}),
							'\u9009\u62E9\u5C01\u9762'
						),
						this.props.isPass && _react2["default"].createElement('span', { id: 'warn_picName', className: 'warn1' })
					),
					_react2["default"].createElement(
						'div',
						{ className: 'Item', id: 'short' },
						_react2["default"].createElement(
							'span',
							{ className: 'itemNameM' },
							'\u8BFE\u7A0B\u7B80\u4ECB'
						),
						_react2["default"].createElement(
							'div',
							{ id: 'textEditorWarp' },
							_react2["default"].createElement('script', { id: 'editor', style: { height: 400 } })
						),
						_react2["default"].createElement('div', { className: 'warn2', id: 'warn_introduction' })
					),
					this.props.isPass && _react2["default"].createElement(
						'button',
						{ onClick: this._save, id: 'save', className: 'activeBtn' },
						'\u4FDD\u5B58'
					)
				);
			}
		}]);

		return BluMUI_classItru;
	}(_react2["default"].Component);

	var BluMUI_AssessmentScheme = function (_React$Component7) {
		_inherits(BluMUI_AssessmentScheme, _React$Component7);

		function BluMUI_AssessmentScheme(props) {
			_classCallCheck(this, BluMUI_AssessmentScheme);

			var _this10 = _possibleConstructorReturn(this, (BluMUI_AssessmentScheme.__proto__ || Object.getPrototypeOf(BluMUI_AssessmentScheme)).call(this, props));

			_this10.state = {
				items: _this10.props.items,
				isDown: false,
				isUpload: _this10.props.isUpload || true
			};
			_this10._isDown = _this10._isDown.bind(_this10);
			_this10._save = _this10._save.bind(_this10);
			return _this10;
		}

		_createClass(BluMUI_AssessmentScheme, [{
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				this.state = {
					items: nextProps.items
				};
			}
		}, {
			key: '_isDown',
			value: function _isDown() {
				this.state.isDown = !this.state.isDown;
			}
		}, {
			key: '_save',
			value: function _save(e) {
				if (this.state.isUpload) {
					var data = {
						file: {
							value: document.getElementById('file').files,
							maxSize: 20,
							errorInf: '未选择文件',
							suffix: ['pdf']
						},
						ableDownload: {
							value: this.state.isDown ? 1 : 2
						}
					};
					if (this.props.saveAjax) this.props.saveAjax(data, this.props.ajaxName, this);
				}
			}
		}, {
			key: '_createList',
			value: function _createList() {
				var i,
				    j,
				    items = this.state.items,
				    result = [];
				for (i = 0, j = items.length; i < j; i++) {
					if (!this.props.isPass) {
						items[i].splice(1, 1);
					}
					result.push(_react2["default"].createElement(BluMUI_List, { id: '',
						key: i,
						items: this.state.items[i],
						callback: this.props.callback,
						ajaxName: this.props.ajaxName
					}));
				}
				return result;
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2["default"].createElement(
					'div',
					{ id: this.props.id },
					_react2["default"].createElement(
						'div',
						null,
						_react2["default"].createElement(
							'span',
							{ className: 'title' },
							this.props.title
						)
					),
					this.props.isPass && _react2["default"].createElement(
						'div',
						null,
						_react2["default"].createElement(
							'div',
							{ className: 'Item', id: 'khfa' },
							_react2["default"].createElement(
								'span',
								{ className: 'itemNameM' },
								this.props.title
							),
							_react2["default"].createElement(BluMUI_FileUp, { fileId: 'file',
								warnId: 'warn_file',
								fileFormName: this.props.fileFormName
							})
						),
						_react2["default"].createElement(
							'div',
							{ className: 'Item', id: 'isDown' },
							_react2["default"].createElement(
								'span',
								{ className: 'isDownLoadFile' },
								'\u5141\u8BB8\u4E0B\u8F7D'
							),
							_react2["default"].createElement(BlueMUI_Radio, { callback: this._isDown
							})
						),
						_react2["default"].createElement(
							'button',
							{ onClick: this._save, className: this.state.isUpload ? 'activeBtn' : 'noActiveBtn' },
							'\u4E0A\u4F20'
						),
						_react2["default"].createElement(
							'div',
							{ className: 'Item' },
							_react2["default"].createElement(
								'span',
								{ className: 'uploadWarn' },
								'\u53EA\u5141\u8BB8\u4E0A\u4F20pdf\u683C\u5F0F\u7684\u6587\u4EF6'
							)
						)
					),
					_react2["default"].createElement(
						'div',
						{ className: 'fileList' },
						this._createList()
					)
				);
			}
		}]);

		return BluMUI_AssessmentScheme;
	}(_react2["default"].Component);

	var BluMUI_KnowledgeSystem = function (_React$Component8) {
		_inherits(BluMUI_KnowledgeSystem, _React$Component8);

		function BluMUI_KnowledgeSystem(props) {
			_classCallCheck(this, BluMUI_KnowledgeSystem);

			var _this11 = _possibleConstructorReturn(this, (BluMUI_KnowledgeSystem.__proto__ || Object.getPrototypeOf(BluMUI_KnowledgeSystem)).call(this, props));

			_this11.state = {
				isableDownLoad0: false,
				isableDonwLoad1: true,
				txItems: _this11.props.txItems,
				ljItems: _this11.props.ljItems,
				isUploadLj: _this11.props.isUploadLj || true,
				isUploadTx: _this11.props.isUploadTx || true
			};
			return _this11;
		}

		_createClass(BluMUI_KnowledgeSystem, [{
			key: '_isDown',
			value: function _isDown(type) {
				var that = this;
				return function () {
					if (type == 0) {
						that.state.isableDownLoad0 = !that.state.isableDownLoad0;
					} else {
						that.state.isableDownLoad1 = !that.state.isableDownLoad1;
					}
				};
			}
		}, {
			key: '_save',
			value: function _save(flag) {
				var that = this,
				    data;
				return function () {
					if (flag == 0) {
						if (that.state.isUploadTx) {
							data = {
								file: {
									value: document.getElementById('file1').files,
									type: 'tx',
									errorInf: "未选择文件",
									suffix: ['pdf']
								},
								ableDownload: {
									value: that.state.isableDownLoad0 ? 1 : 2
								}
							};
							that.props.saveAjax(data, '知识体系', that);
						}
					} else {
						if (that.state.isUploadLj) {
							data = {
								file: {
									value: document.getElementById('file2').files,
									type: 'lj',
									errorInf: "未选择文件",
									suffix: ['pdf']
								},
								ableDownload: {
									value: that.state.isableDownLoad1 ? 1 : 2
								}
							};
							that.props.saveAjax(data, '逻辑关系', that);
						}
					}
				};
			}
		}, {
			key: '_createList',
			value: function _createList(value, name) {
				var i,
				    j,
				    items = this.state[value],
				    result = [];
				for (i = 0, j = items.length; i < j; i++) {
					if (!this.props.isPass) {
						items[i].splice(1, 1);
					}
					result.push(_react2["default"].createElement(BluMUI_List, { id: '',
						key: i,
						items: items[i],
						callback: this.props.callback,
						ajaxName: name
					}));
				}
				return result;
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2["default"].createElement(
					'div',
					{ id: 'KnowledgeSystem' },
					_react2["default"].createElement(
						'div',
						null,
						_react2["default"].createElement(
							'div',
							null,
							_react2["default"].createElement(
								'span',
								{ className: 'title' },
								'\u77E5\u8BC6\u70B9\u4F53\u7CFB'
							)
						),
						_react2["default"].createElement(
							'div',
							{ className: 'Item', id: 'knowTx' },
							_react2["default"].createElement(
								'span',
								{ className: 'itemNameM' },
								this.props.title
							),
							this.props.isPass && _react2["default"].createElement(BluMUI_FileUp, { fileFormName: 'file1',
								fileId: 'file1',
								warnId: 'warn_tx'
							})
						),
						this.props.isPass && _react2["default"].createElement(
							'div',
							{ className: 'Item', id: 'isDown' },
							_react2["default"].createElement(
								'span',
								{ className: 'isDownLoad' },
								'\u5141\u8BB8\u4E0B\u8F7D'
							),
							_react2["default"].createElement(BlueMUI_Radio, { callback: this._isDown(0)
							})
						),
						this.props.isPass && _react2["default"].createElement(
							'button',
							{ onClick: this._save(0), className: this.state.isUploadTx ? 'activeBtn save' : 'noActiveBtn save' },
							'\u4E0A\u4F20'
						),
						this.props.isPass && _react2["default"].createElement(
							'div',
							{ className: 'Item' },
							_react2["default"].createElement(
								'span',
								{ className: 'uploadWarn' },
								'\u53EA\u5141\u8BB8\u4E0A\u4F20pdf\u683C\u5F0F\u7684\u6587\u4EF6'
							)
						),
						_react2["default"].createElement(
							'div',
							{ className: 'fileList' },
							this._createList('txItems', '知识体系')
						),
						_react2["default"].createElement(
							'div',
							{ className: 'Item', id: 'knowLj' },
							_react2["default"].createElement(
								'span',
								{ className: 'itemNameM' },
								'\u77E5\u8BC6\u70B9\u903B\u8F91\u5173\u7CFB'
							),
							this.props.isPass && _react2["default"].createElement(BluMUI_FileUp, { fileFormName: 'file2',
								fileId: 'file2',
								warnId: 'warn_lj'
							})
						),
						this.props.isPass && _react2["default"].createElement(
							'div',
							{ className: 'Item', id: 'isDown' },
							_react2["default"].createElement(
								'span',
								{ className: 'isDownLoad' },
								'\u5141\u8BB8\u4E0B\u8F7D'
							),
							_react2["default"].createElement(BlueMUI_Radio, { callback: this._isDown(1)
							})
						),
						this.props.isPass && _react2["default"].createElement(
							'button',
							{ className: this.state.isUploadLj ? 'activeBtn save' : 'noActiveBtn save', onClick: this._save(1) },
							'\u4E0A\u4F20'
						),
						this.props.isPass && _react2["default"].createElement(
							'div',
							{ className: 'Item' },
							_react2["default"].createElement(
								'span',
								{ className: 'uploadWarn' },
								'\u53EA\u5141\u8BB8\u4E0A\u4F20pdf\u683C\u5F0F\u7684\u6587\u4EF6'
							)
						),
						_react2["default"].createElement(
							'div',
							{ className: 'fileList' },
							this._createList('ljItems', '逻辑关系')
						)
					)
				);
			}
		}]);

		return BluMUI_KnowledgeSystem;
	}(_react2["default"].Component);

	var BluMUI_StudySource = function (_React$Component9) {
		_inherits(BluMUI_StudySource, _React$Component9);

		function BluMUI_StudySource(props) {
			_classCallCheck(this, BluMUI_StudySource);

			var _this12 = _possibleConstructorReturn(this, (BluMUI_StudySource.__proto__ || Object.getPrototypeOf(BluMUI_StudySource)).call(this, props));

			_this12.state = {
				isDown: true,
				fileName: '',
				bookType: '',
				otherVideo: _this12.props.otherVideo,
				sourceType: _this12.props.title,
				jcBooks: _this12.props.jcBooks,
				ckBooks: _this12.props.ckBooks,
				onlineSource: _this12.props.onlineSource,
				onlineURL: _this12.props.onlineURL,
				videos: _this12.props.videos,
				jyFile: _this12.props.jyFile,
				jyAttachment: _this12.props.jyAttachment,
				hkFile: _this12.props.hkFile,
				xtFile: _this12.props.xtFile,
				isUpload: true,
				isUpload1: true,
				addBox: false
			};
			_this12._isDown = _this12._isDown.bind(_this12);
			_this12._uploadPic = _this12._uploadPic.bind(_this12);
			_this12._delete = _this12._delete.bind(_this12);
			_this12._add = _this12._add.bind(_this12);
			_this12._sure = _this12._sure.bind(_this12);
			_this12._off = _this12._off.bind(_this12);
			_this12._save = _this12._save.bind(_this12);
			return _this12;
		}

		_createClass(BluMUI_StudySource, [{
			key: '_off',
			value: function _off() {
				this.setState({
					addBox: false
				});
			}
		}, {
			key: '_sure',
			value: function _sure() {
				var data = {
					picURL: {
						value: this.state.fileName,
						type: 'picName'
					},
					bookName: {
						value: this.bookName.value,
						pattern: /\S{1,}/,
						errorInf: '未填写书籍名称'
					},
					author: {
						value: this.author.value,
						pattern: /\S{1,}/,
						errorInf: '未填作者名字'
					},
					press: {
						value: this.press.value,
						pattern: /\S{1,}/,
						errorInf: '未填写出版社'
					},
					bookType: {
						value: this.state.bookType
					}
				};
				this.props.saveAjax(data, this.state.bookType, this);
			}
		}, {
			key: '_add',
			value: function _add(type) {
				var that = this;
				return function () {
					that.setState(function (prevState, props) {
						return {
							addBox: !prevState.addBox,
							bookType: type
						};
					});
				};
			}
		}, {
			key: '_delete',
			value: function _delete(type, index) {
				var that = this,
				    item;
				switch (type) {
					case '微视频':
						item = this.state.videos;
						break;
					case '教材':
						item = this.state.jcBooks;
						break;
					case '参考书':
						item = this.state.ckBooks;
						break;
				}
				return function () {
					that.props.deleteFile(type, index, that, 2, item);
				};
			}
		}, {
			key: '_uploadPic',
			value: function _uploadPic() {
				this.props.uploadFile(this.file.files, 'teachBook', this.img, this);
			}
		}, {
			key: '_createSimpDrop',
			value: function _createSimpDrop() {
				var result = [],
				    i,
				    drops = this.props.drops,
				    len;
				for (i = 0, len = drops.length; i < len; i++) {
					var props = drops[i];
					result.push(_react2["default"].createElement(BluMUI_SimpleDrop, _extends({}, props, {
						key: i
					})));
				}
				return result;
			}
		}, {
			key: '_createList',
			value: function _createList(ajaxName) {
				var i,
				    j,
				    items,
				    result = [];
				if (ajaxName == '讲义附件') {
					items = this.state.jyAttachment;
				}
				if (ajaxName == '讲义') {
					items = this.state.jyFile;
				}
				if (ajaxName == '作业') {
					items = this.state.hkFile;
				}
				if (ajaxName == '习（试）题库') {
					items = this.state.xtFile;
				}
				if (ajaxName == '网络参考资源') {
					items = this.state.onlineSource;
				}
				if (ajaxName == '网络学习资源URL') {
					items = this.state.onlineURL;
				}
				if (ajaxName == '其他微视频') {
					items = this.state.otherVideo;
				}
				for (i = 0, j = items.length; i < j; i++) {
					if (!this.props.isPass) {
						items[i].splice(1, 1);
					}
					result.push(_react2["default"].createElement(BluMUI_List, { id: '',
						key: i,
						items: items[i],
						ajaxName: ajaxName
					}));
				}
				return result;
			}
		}, {
			key: '_createBookItem',
			value: function _createBookItem(bookInf, type) {
				var i,
				    len,
				    result = [];
				for (i = 0, len = bookInf.length; i < len; i++) {
					result.push(_react2["default"].createElement(
						'div',
						{ className: 'bookBox', key: i },
						_react2["default"].createElement('img', { src: bookInf[i].img }),
						_react2["default"].createElement(
							'ul',
							{ className: 'bookBoxWarp' },
							_react2["default"].createElement(
								'li',
								null,
								_react2["default"].createElement(
									'span',
									{ className: 'name' },
									'\u4E66\u7C4D\u540D\u79F0'
								),
								_react2["default"].createElement(
									'span',
									{ className: 'value' },
									_react2["default"].createElement(
										'a',
										null,
										':'
									),
									bookInf[i].bookName
								)
							),
							_react2["default"].createElement(
								'li',
								null,
								_react2["default"].createElement(
									'span',
									{ className: 'name' },
									'\u4F5C\u8005'
								),
								_react2["default"].createElement(
									'span',
									{ className: 'value' },
									_react2["default"].createElement(
										'a',
										null,
										':'
									),
									bookInf[i].author
								)
							),
							_react2["default"].createElement(
								'li',
								null,
								_react2["default"].createElement(
									'span',
									{ className: 'name' },
									'\u51FA\u7248'
								),
								_react2["default"].createElement(
									'span',
									{ className: 'value' },
									_react2["default"].createElement(
										'a',
										null,
										':'
									),
									bookInf[i].publisher
								)
							)
						),
						this.props.isPass && _react2["default"].createElement(
							'span',
							{ className: 'delete', onClick: this._delete(type, i) },
							'\u5220\u9664'
						)
					));
				}
				return _react2["default"].createElement(
					'div',
					{ className: 'bookWarp' },
					result
				);
			}
		}, {
			key: '_isDown',
			value: function _isDown() {
				this.state.isDown = !this.state.isDown;
			}
		}, {
			key: '_createVideo',
			value: function _createVideo() {
				var i,
				    len,
				    videos = this.state.videos,
				    result = [];
				for (i = 0, len = videos.length; i < len; i++) {
					result.push(_react2["default"].createElement(
						'div',
						{ className: 'videos',
							key: i
						},
						_react2["default"].createElement('img', { src: videos[i].img }),
						_react2["default"].createElement(
							'span',
							{ className: 'name', title: videos[i].name },
							videos[i].name
						),
						_react2["default"].createElement(
							'span',
							{ className: 'speaker' },
							videos[i].zjr
						),
						this.props.isPass && _react2["default"].createElement(
							'span',
							{ className: 'delete', onClick: this._delete('微视频', i) },
							'\u5220\u9664'
						)
					));
				}
				return result;
			}
		}, {
			key: '_save',
			value: function _save(ID, type, fileId) {
				var data = {},
				    that = this;
				return function () {
					if (type == 'file') {
						var file = document.getElementById(fileId).files;
						data.file = {
							value: file,
							errorInf: '未选择文件',
							type: fileId,
							maxSize: 20
						};
						data.ableDownload = {
							value: 1
						};
						if (ID == '讲义') {
							data.file.suffix = ['pdf'];
							data.ableDownload.value = that.state.isDown ? 1 : 2;
						}
						if (ID == '微视频') {
							data.speaker = {
								value: document.getElementById('speaker1').value,
								errorInf: '未填写主讲人',
								pattern: /\S{1,}/,
								type: 'speaker1'
							};
							data.file.maxSize = 500;
							data.file.suffix = ['mp4'];
						}

						if (that.state.isUpload && ID != '讲义附件') {
							that.props.saveAjax(data, ID, that);
						} else if (that.state.isUpload1) {
							that.props.saveAjax(data, ID, that);
						}
					} else {
						var sourceName = document.getElementById('name').value,
						    link = document.getElementById('link').value;
						data = {
							linkURL: {
								value: link,
								pattern: /^(http(s)?:\/\/){1}\w+\.\w+\.\w+/,
								errorInf: '未填写资源地址或者地址格式错误'
							},
							linkName: {
								value: sourceName,
								pattern: /\S{1,}/,
								errorInf: '未填写资源名称'
							}
						};
						if (ID == '其他微视频') {
							data.speaker = {
								value: document.getElementById('speaker2').value,
								errorInf: '未填写主讲人',
								pattern: /\S{1,}/,
								type: 'speaker2'
							};
							data.linkName.errorInf = '未填写视频名称';
							data.linkURL.errorInf = '未填写视频资源地址或者地址格式错误';
						}
						that.props.saveAjax(data, ID, that);
					}
				};
			}
		}, {
			key: '_selector',
			value: function _selector() {
				var result,
				    sourceType = this.state.sourceType;
				this.state.isDown = false;
				switch (sourceType) {
					case "微视频":
						result = _react2["default"].createElement(
							'div',
							null,
							this.props.isPass && _react2["default"].createElement(
								'div',
								{ className: 'Item inputWarp' },
								_react2["default"].createElement(
									'span',
									{ className: 'itemNameM' },
									'\u4E3B\u8BB2\u4EBA'
								),
								_react2["default"].createElement('input', { type: 'text', id: 'speaker1' }),
								_react2["default"].createElement('span', { className: 'warn', id: 'warn_speaker1' })
							),
							_react2["default"].createElement(
								'div',
								{ className: 'Item', id: 'content3' },
								_react2["default"].createElement(
									'span',
									{ className: 'itemNameM' },
									sourceType
								),
								this.props.isPass && _react2["default"].createElement(BluMUI_FileUp, { fileId: 'file',
									warnId: 'warn_file',
									fileFormName: this.props.fileFormName
								})
							),
							this.props.isPass && _react2["default"].createElement(
								'button',
								{ className: this.state.isUpload ? 'save activeBtn' : 'save noActiveBtn', onClick: this._save('微视频', 'file', 'file') },
								'\u4E0A\u4F20'
							),
							this.props.isPass && _react2["default"].createElement(
								'div',
								{ className: 'Item' },
								_react2["default"].createElement(
									'span',
									{ className: 'uploadWarn' },
									'\u53EA\u5141\u8BB8\u4E0A\u4F20mp4\u683C\u5F0F\u7684\u89C6\u9891'
								)
							),
							_react2["default"].createElement(
								'div',
								{ className: 'VideoList' },
								this._createVideo()
							),
							_react2["default"].createElement(
								'div',
								{ className: 'Item', id: 'content5' },
								_react2["default"].createElement(
									'span',
									{ className: 'itemName' },
									'\u5176\u4ED6\u89C6\u9891\u8D44\u6E90'
								)
							),
							this.props.isPass && _react2["default"].createElement(
								'div',
								{ className: 'Item inputWarp' },
								_react2["default"].createElement(
									'span',
									{ className: 'itemNameM' },
									'\u4E3B\u8BB2\u4EBA'
								),
								_react2["default"].createElement('input', { type: 'text', id: 'speaker2' }),
								_react2["default"].createElement('span', { className: 'warn', id: 'warn_speaker2' })
							),
							this.props.isPass && _react2["default"].createElement(
								'div',
								{ className: 'Item inputWarp' },
								_react2["default"].createElement(
									'span',
									{ className: 'itemNameM' },
									'\u89C6\u9891\u540D\u79F0'
								),
								_react2["default"].createElement('input', { type: 'text', id: 'name' }),
								_react2["default"].createElement('span', { className: 'warn', id: 'warn_linkName' })
							),
							this.props.isPass && _react2["default"].createElement(
								'div',
								{ className: 'Item inputWarp' },
								_react2["default"].createElement(
									'span',
									{ className: 'itemNameM' },
									'\u89C6\u9891\u8D44\u6E90\u5730\u5740'
								),
								_react2["default"].createElement('input', { type: 'text', id: 'link' }),
								_react2["default"].createElement('span', { className: 'warn', id: 'warn_linkURL' })
							),
							this.props.isPass && _react2["default"].createElement(
								'button',
								{ className: 'save activeBtn', onClick: this._save('其他微视频', 'link') },
								'\u6DFB\u52A0'
							),
							_react2["default"].createElement(
								'div',
								{ className: 'fileList' },
								this._createList('其他微视频')
							)
						);
						break;
					case "网络在线学习资源及链接":
						result = _react2["default"].createElement(
							'div',
							null,
							_react2["default"].createElement(
								'div',
								{ className: 'Item', id: 'content4' },
								_react2["default"].createElement(
									'span',
									{ className: 'itemNameM' },
									'\u7F51\u7EDC\u53C2\u8003\u8D44\u6E90'
								),
								this.props.isPass && _react2["default"].createElement(BluMUI_FileUp, { fileId: 'file',
									fileFormName: this.props.fileFormName,
									warnId: 'warn_file'
								})
							),
							this.props.isPass && _react2["default"].createElement(
								'button',
								{ className: this.state.isUpload ? 'save activeBtn' : 'save noActiveBtn', onClick: this._save('网络参考资源', 'file', 'file') },
								'\u4E0A\u4F20'
							),
							this.props.isPass && _react2["default"].createElement(
								'div',
								{ className: 'fileList' },
								this._createList('网络参考资源')
							),
							this.props.isPass && _react2["default"].createElement(
								'div',
								{ className: 'Item inputWarp' },
								_react2["default"].createElement(
									'span',
									{ className: 'itemNameM' },
									'\u5176\u4ED6\u8D44\u6E90\u540D\u79F0'
								),
								_react2["default"].createElement('input', { type: 'text', id: 'name' }),
								_react2["default"].createElement('span', { className: 'warn', id: 'warn_linkName' })
							),
							this.props.isPass && _react2["default"].createElement(
								'div',
								{ className: 'Item inputWarp' },
								_react2["default"].createElement('input', { type: 'text', id: 'link' }),
								_react2["default"].createElement(
									'span',
									{ className: 'itemNameM' },
									'\u5176\u4ED6\u8D44\u6E90\u5730\u5740'
								),
								_react2["default"].createElement('span', { className: 'warn', id: 'warn_linkURL' })
							),
							this.props.isPass && _react2["default"].createElement(
								'button',
								{ className: 'save activeBtn', onClick: this._save('网络学习资源URL', 'link') },
								'\u6DFB\u52A0'
							),
							_react2["default"].createElement(
								'div',
								{ className: 'fileList' },
								this._createList('网络学习资源URL')
							)
						);
						break;
					case '讲义':
						result = _react2["default"].createElement(
							'div',
							null,
							_react2["default"].createElement(
								'div',
								{ className: 'Item', id: 'content' },
								_react2["default"].createElement(
									'span',
									{ className: 'itemNameM' },
									'\u8BB2\u4E49'
								),
								this.props.isPass && _react2["default"].createElement(BluMUI_FileUp, { fileId: 'file',
									fileFormName: this.props.fileFormName,
									warnId: 'warn_file'
								})
							),
							_react2["default"].createElement(
								'div',
								{ className: 'Item', id: 'isDown' },
								_react2["default"].createElement(
									'span',
									{ className: 'isDownLoadFile_jy' },
									'\u5141\u8BB8\u4E0B\u8F7D'
								),
								_react2["default"].createElement(BlueMUI_Radio, { callback: this._isDown
								})
							),
							this.props.isPass && _react2["default"].createElement(
								'button',
								{ className: this.state.isUpload ? 'save activeBtn' : 'save noActiveBtn', onClick: this._save('讲义', 'file', 'file') },
								'\u4E0A\u4F20'
							),
							this.props.isPass && _react2["default"].createElement(
								'div',
								{ className: 'Item' },
								_react2["default"].createElement(
									'span',
									{ className: 'uploadWarn' },
									'\u53EA\u5141\u8BB8\u4E0A\u4F20pdf\u683C\u5F0F\u7684\u6587\u4EF6,\u7528\u6237\u53EF\u5728\u7EBF\u6D4F\u89C8\u8BB2\u4E49'
								)
							),
							_react2["default"].createElement(
								'div',
								{ className: 'fileList' },
								this._createList('讲义')
							),
							_react2["default"].createElement(
								'div',
								{ className: 'Item', id: 'content' },
								_react2["default"].createElement(
									'span',
									{ className: 'itemNameM' },
									'\u5176\u4ED6\u9644\u4EF6'
								),
								this.props.isPass && _react2["default"].createElement(BluMUI_FileUp, { fileId: 'file1',
									fileFormName: this.props.fileFormName,
									warnId: 'warn_file1'
								})
							),
							this.props.isPass && _react2["default"].createElement(
								'button',
								{ className: this.state.isUpload1 ? 'save activeBtn' : 'save noActiveBtn', onClick: this._save('讲义附件', 'file', 'file1') },
								'\u4E0A\u4F20'
							),
							this.props.isPass && _react2["default"].createElement(
								'div',
								{ className: 'Item' },
								_react2["default"].createElement(
									'span',
									{ className: 'uploadWarn' },
									'\u7528\u6237\u53EA\u80FD\u4E0B\u8F7D\u9644\u4EF6'
								)
							),
							_react2["default"].createElement(
								'div',
								{ className: 'fileList' },
								this._createList('讲义附件')
							)
						);
						break;
					case "习（试）题库":
					case "作业":
						result = _react2["default"].createElement(
							'div',
							null,
							_react2["default"].createElement(
								'div',
								{ className: 'Item', id: 'content' },
								_react2["default"].createElement(
									'span',
									{ className: 'itemNameM' },
									sourceType
								),
								this.props.isPass && _react2["default"].createElement(BluMUI_FileUp, { fileId: 'file',
									fileFormName: this.props.fileFormName,
									warnId: 'warn_file'
								})
							),
							this.props.isPass && _react2["default"].createElement(
								'button',
								{ className: this.state.isUpload ? 'save activeBtn' : 'save noActiveBtn', onClick: this._save(sourceType, 'file', 'file') },
								'\u4E0A\u4F20'
							),
							_react2["default"].createElement(
								'div',
								{ className: 'fileList' },
								this._createList(sourceType)
							)
						);
						break;
					case '教材/参考书':
						result = _react2["default"].createElement(
							'div',
							{ id: 'teachBook' },
							_react2["default"].createElement(
								'div',
								{ className: 'Item', id: 'content1' },
								_react2["default"].createElement(
									'span',
									{ className: 'itemName' },
									'\u8BFE\u7A0B\u6559\u6750'
								),
								this.props.isPass && _react2["default"].createElement(
									'button',
									{ onClick: this._add('教材'), className: 'activeBtn' },
									'\u6DFB\u52A0'
								)
							),
							this._createBookItem(this.state.jcBooks, '教材'),
							_react2["default"].createElement(
								'div',
								{ className: 'Item', id: 'content2' },
								_react2["default"].createElement(
									'span',
									{ className: 'itemName' },
									'\u53C2\u8003\u4E66'
								),
								this.props.isPass && _react2["default"].createElement(
									'button',
									{ onClick: this._add('参考书'), className: 'activeBtn' },
									'\u6DFB\u52A0'
								)
							),
							this._createBookItem(this.state.ckBooks, '参考书')
						);
						break;
					default:
						break;
				}
				return result;
			}
		}, {
			key: 'render',
			value: function render() {
				var _this13 = this;

				return _react2["default"].createElement(
					'div',
					{ id: this.props.id, className: 'BluMUI_Table' },
					_react2["default"].createElement(
						'div',
						null,
						_react2["default"].createElement(
							'span',
							{ className: 'title' },
							'\u5B66\u4E60\u8D44\u6E90'
						)
					),
					_react2["default"].createElement(
						'div',
						{ className: 'Item', id: 'sourceType' },
						_react2["default"].createElement(
							'span',
							{ className: 'itemName' },
							'\u8D44\u6E90\u7C7B\u578B'
						),
						_react2["default"].createElement(
							'div',
							{ className: 'dropList' },
							this._createSimpDrop(),
							_react2["default"].createElement('div', { className: 'warn' })
						)
					),
					this._selector(),
					this.state.addBox && _react2["default"].createElement(
						'div',
						{ id: 'addBox' },
						_react2["default"].createElement(
							'div',
							{ className: 'box' },
							_react2["default"].createElement(
								'div',
								{ className: 'header' },
								_react2["default"].createElement(
									'span',
									null,
									'添加' + this.state.bookType
								)
							),
							_react2["default"].createElement(
								'div',
								{ className: 'body' },
								_react2["default"].createElement(
									'div',
									{ className: 'Item', id: 'face' },
									_react2["default"].createElement(
										'span',
										{ className: 'itemName' },
										'\u6559\u6750\u5C01\u9762'
									),
									_react2["default"].createElement(
										'div',
										{ className: 'fileArea' },
										_react2["default"].createElement('img', { className: 'fileInput', ref: function ref(img) {
												return _this13.img = img;
											} })
									),
									_react2["default"].createElement(
										'button',
										{ className: 'fileUp activeBtn' },
										_react2["default"].createElement('input', { type: 'file',
											ref: function ref(file) {
												return _this13.file = file;
											},
											onChange: this._uploadPic
										}),
										'\u4E0A\u4F20\u5C01\u9762'
									),
									_react2["default"].createElement('span', { id: 'warn_picName', className: 'warn1' })
								),
								_react2["default"].createElement(
									'div',
									{ className: 'Item1' },
									_react2["default"].createElement(
										'span',
										{ className: 'itemNameM' },
										'\u4E66\u7C4D\u540D\u79F0'
									),
									_react2["default"].createElement('input', { type: 'text', ref: function ref(bookName) {
											return _this13.bookName = bookName;
										} }),
									_react2["default"].createElement('span', { id: 'warn_bookName', className: 'warn2' })
								),
								_react2["default"].createElement(
									'div',
									{ className: 'Item1' },
									_react2["default"].createElement(
										'span',
										{ className: 'itemNameM' },
										'\u4F5C\u8005'
									),
									_react2["default"].createElement('input', { type: 'text', ref: function ref(author) {
											return _this13.author = author;
										} }),
									_react2["default"].createElement('span', { id: 'warn_author', className: 'warn2' })
								),
								_react2["default"].createElement(
									'div',
									{ className: 'Item1' },
									_react2["default"].createElement(
										'span',
										{ className: 'itemNameM' },
										'\u51FA\u7248\u793E'
									),
									_react2["default"].createElement('input', { type: 'text', ref: function ref(press) {
											return _this13.press = press;
										} }),
									_react2["default"].createElement('span', { id: 'warn_press', className: 'warn2' })
								),
								_react2["default"].createElement(
									'div',
									{ className: 'control' },
									_react2["default"].createElement(
										'button',
										{ className: 'left', onClick: this._sure },
										'\u786E\u5B9A'
									),
									_react2["default"].createElement(
										'button',
										{ className: 'right', onClick: this._off },
										'\u53D6\u6D88'
									)
								)
							)
						)
					)
				);
			}
		}]);

		return BluMUI_StudySource;
	}(_react2["default"].Component);

	var BluMUI_CourseStatus = function (_React$Component10) {
		_inherits(BluMUI_CourseStatus, _React$Component10);

		function BluMUI_CourseStatus(props) {
			_classCallCheck(this, BluMUI_CourseStatus);

			return _possibleConstructorReturn(this, (BluMUI_CourseStatus.__proto__ || Object.getPrototypeOf(BluMUI_CourseStatus)).call(this, props));
		}

		_createClass(BluMUI_CourseStatus, [{
			key: '_createLi',
			value: function _createLi(items) {
				var i,
				    len,
				    result = [];
				for (i = 0, len = items.length; i < len; i++) {
					result.push(_react2["default"].createElement(
						'li',
						{ key: i, className: 'status' },
						items[i]
					));
				}
				return result;
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2["default"].createElement(
					'div',
					{ className: 'BluMUI_CourseStatus' },
					this.props.noSubmit.length > 0 && _react2["default"].createElement(
						'ul',
						null,
						_react2["default"].createElement(
							'li',
							{ className: 'statusTitle' },
							'\u672A\u88AB\u63D0\u4EA4:'
						),
						this._createLi(this.props.noSubmit)
					),
					this.props.noReviewCourse.length > 0 && _react2["default"].createElement(
						'ul',
						null,
						_react2["default"].createElement(
							'li',
							{ className: 'statusTitle' },
							'\u672A\u88AB\u5BA1\u6838:'
						),
						this._createLi(this.props.noReviewCourse)
					),
					this.props.passCourse.length > 0 && _react2["default"].createElement(
						'ul',
						null,
						_react2["default"].createElement(
							'li',
							{ className: 'statusTitle' },
							'\u5BA1\u6838\u901A\u8FC7:'
						),
						this._createLi(this.props.passCourse)
					),
					this.props.rejectCourse.length > 0 && _react2["default"].createElement(
						'ul',
						null,
						_react2["default"].createElement(
							'li',
							{ className: 'statusTitle' },
							'\u5DF2\u88AB\u9A73\u56DE:'
						),
						this._createLi(this.props.rejectCourse)
					),
					this.props.notes.length > 0 && _react2["default"].createElement(
						'ul',
						{ className: 'notes' },
						_react2["default"].createElement(
							'li',
							{ className: 'statusTitle' },
							'\u5907\u6CE8:'
						),
						this._createLi(this.props.notes)
					)
				);
			}
		}]);

		return BluMUI_CourseStatus;
	}(_react2["default"].Component);

	var BluMUI_M = {
		List: BluMUI_List,
		ClassItru: BluMUI_classItru,
		AssessmentScheme: BluMUI_AssessmentScheme,
		KnowledgeSystem: BluMUI_KnowledgeSystem,
		CourseStatus: BluMUI_CourseStatus,
		StudySource: BluMUI_StudySource
	};
	var BluMUI = {
		result: {},
		create: function create(data, type, elem, callback) {
			var props = data,
			    Blu = BluMUI_M[type];
			this.result[props.id] = _reactDom2["default"].render(_react2["default"].createElement(Blu, props), elem);
			if (callback) callback();
		}
	};
	exports["default"] = BluMUI;
	module.exports = exports['default'];

/***/ },

/***/ 165:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var ajaxExpanding = function () {
		function isDomObject(domObject, type) {
			if (domObject == null || undefined) {
				return false;
			}
			if ((typeof domObject === 'undefined' ? 'undefined' : _typeof(domObject)) == 'object' && domObject.nodeType === 1) {
				if (!type || type == 'all' || domObject.nodeName.toLowerCase() == type.toLowerCase()) return true;else return false;
			} else {
				return false;
			}
		}
		function suffixParse(fileName) {
			var array = fileName.split('.');
			console.log(array[array.length - 1]);
			return array[array.length - 1];
		}
		function isJson(obj) {
			var isjson = (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
			return isjson;
		}
		function getXhr() {
			if (typeof XMLHttpRequest == 'undefined') XMLHttpRequest = function XMLHttpRequest() {
				try {
					return new ActiveXObject("Msxml2.XMLHTTP.6.0");
				} catch (e) {}
				try {
					return new ActiveXObject("Msxml2.XMLHTTP.3.0");
				} catch (e) {}
				try {
					return new ActiveXObject("Msxml2.XMLHTTP");
				} catch (e) {}
				return false;
			};
			return new XMLHttpRequest();
		}
		function encodeData(dataObj, name, that, dataType) {
			var data = '',
			    i,
			    j,
			    isSuffix = true,
			    isSize = true,
			    suffix,
			    size,
			    len,
			    errorInf = '',
			    checkInf = {},
			    checkInfs = [],
			    key;
			switch (dataType) {
				case 'json':
					if ((typeof dataObj === 'undefined' ? 'undefined' : _typeof(dataObj)) == 'object') {
						for (key in dataObj) {
							if (dataObj[key]) {
								if (data !== '') data += '&' + key + '=' + JSON.stringify(dataObj[key]).replace(/\"/g, "");else data += key + '=' + JSON.stringify(dataObj[key]).replace(/\"/g, "");
							}
						}
					} else if (typeof dataObj == 'string') {
						data = dataObj;
					}
					break;
				case 'form':
					// 通过formData 传输
					if (window.FormData) {
						var formData = new FormData();
						if ((typeof dataObj === 'undefined' ? 'undefined' : _typeof(dataObj)) == 'object') {
							console.log(dataObj);
							for (key in dataObj) {
								// 文件检测
								if (Object.prototype.toString.call(dataObj[key].value) == '[object FileList]') {
									checkInf = {
										isCheck: true,
										type: dataObj[key].type || key
									};
									len = dataObj[key].value.length;
									if (len == 0) {
										that.ischeck = false;
										checkInf.isCheck = false;
									}
									if (dataObj[key].suffix && that.ischeck) {
										for (i = 0; i < len; i++) {
											suffix = suffixParse(dataObj[key].value[i].name);
											that.ischeck = dataObj[key].suffix.some(function (value) {
												return suffix.toLowerCase() == value.toLowerCase();
											});
											isSuffix = that.ischeck;
										}
									}
									if (dataObj[key].maxSize && isSuffix && that.ischeck) {
										for (i = 0; i < len; i++) {
											size = dataObj[key].value[i].size;
											if (size > dataObj[key].maxSize * 1024 * 1024) {
												that.ischeck = false;
												isSize = false;
											}
										}
									}
									if (len > 0 && !that.ischeck) {
										if (!isSuffix) {
											errorInf = '文件格式不满足:' + dataObj[key].suffix.join(',') + '格式';
										} else if (!isSize) {
											errorInf = '文件大小超过:' + dataObj[key].maxSize + 'mb';
										}
										checkInf.isCheck = false;
									}
									if (that.ischeck) {
										for (i = 0; i < len; i++) {
											formData.append(key, dataObj[key].value[i]);
										}
									}
									checkInf.errorInf = errorInf ? errorInf : dataObj[key].errorInf;
									checkInfs.push(checkInf);
								} else {
									if (dataObj[key].pattern) {
										checkInf = {
											isCheck: true,
											type: dataObj[key].type || key
										};
										var value;
										if (dataObj[key].checkValue != undefined) {
											value = dataObj[key].checkValue;
										} else {
											value = dataObj[key].value;
										}
										if (!dataObj[key].pattern.test(value)) {
											that.ischeck = false;
											checkInf.isCheck = false;
										} else {
											formData.append(key, dataObj[key].value);
										}
										checkInf.errorInf = dataObj[key].errorInf;
										checkInfs.push(checkInf);
									} else {
										formData.append(key, dataObj[key].value);
									}
								}
							}
							if (that.onCheck) {
								console.log(checkInfs);
								that.onCheck(checkInfs);
							}
							data = formData;
						}
					}
					break;
			}
			return data;
		}
		return {
			init: function init(ajaxInf) {
				var that = this[ajaxInf.name] = {};
				that.result = null;
				that.handleData = ajaxInf.handleData || null;
				that.type = ajaxInf.type || 'get';
				that.async = ajaxInf.async || false;
				that.dataType = ajaxInf.dataType || 'json';
				that.timeOut = ajaxInf.timeOut;
				that.xhr = getXhr();
			},
			send: function send(dataInf, name, bindObj) {
				// 发送数据
				var that = this[name],
				    xhr = that.xhr,
				    data;
				that.ischeck = true;
				that.onCheck = dataInf.onCheck;
				data = encodeData(dataInf.data, name, that, that.dataType);
				if (that.ischeck) {
					that.stopFlag = false;
					that.timeoutFlag = false;
					if (dataInf.onStart) {
						dataInf.onStart();
					}
					if (!bindObj) bindObj = that;
					if (dataInf.onProgress) {
						try {
							xhr.onprogress = function (e) {
								if (e.total > 0) dataInf.onProgress.call(bindObj, e.loaded, e.total);
							};
						} catch (e) {}
					}
					if (dataInf.onAbort) {
						try {
							xhr.onabort = function (e) {
								if (that.stopFlag) dataInf.onAbort.call(bindObj, xhr.status);
							};
						} catch (e) {}
					}
					if (dataInf.onError) {
						try {
							xhr.onerror = function (e) {
								dataInf.onError.call(bindObj);
							};
						} catch (e) {}
					}
					xhr.onreadystatechange = function (e) {
						if (xhr.readyState === 4) {
							clearTimeout(timer);
							if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
								that.result = that.handleData == null ? xhr.responseText : that.handleData(xhr.responseText);
								if (dataInf.onSuccess) {
									dataInf.onSuccess.call(bindObj, that.result);
								}
							} else {
								if (!that.stopFlag && !that.timeoutFlag) {
									if (dataInf.onFail) dataInf.onFail.call(bindObj, xhr.status);
								}
							}
						}
						if (xhr.readyState === 0) {
							var timer = setTimeout(function () {
								that.timeoutFlag = true;
								if (that.async && that.timeoutFlag) {
									xhr.abort();
									if (dataInf.onTimeOut) {
										dataInf.onTimeOut.call(bindObj);
									}
								}
							}, that.timeOut);
						}
					};
					if (that.type == 'post') {
						xhr.open(that.type, dataInf.url, that.async); // 创建ajax请求
					} else if (that.type == 'get') {
						if (dataInf.data) {
							xhr.open(that.type, dataInf.url + '?' + data, that.async);
						} else {
							xhr.open(that.type, dataInf.url, that.async);
						}
					}
					if (that.dataType == 'json') xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8"); // 设置发送信息的数据类型
					if (that.type == 'get') xhr.send(null);else {
						console.log(data, 999999999);
						xhr.send(data);
					}
				}
			},
			stop: function stop(name) {
				if (this[name].xhr && !isDomObject(this[name].xhr)) {
					this[name].stopFlag = true;
					this[name].xhr.abort();
				}
			},
			//不用管
			fileListen: function fileListen(lisenURL, needInf, interval, pattern) {
				var that = this,
				    xhr = getXhr();
				xhr.open('post', lisenURL, true);
				xhr.onreadystatechange = function (e) {
					if (xhr.readyState === 4) {
						if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
							var result = xhr.responseText;
							if (pattern(result)) {
								return true;
							} else {
								setTimeout(function () {
									that.fileListen(lisenURL, needInf, interval);
								}, interval);
							}
						}
					}
				};
				xhr.send(needInf);
			},
			// 不用管
			parse: function parse(inputData, outputData, pattern) {
				var result, j, k, i, len;
				switch ((typeof inputData === 'undefined' ? 'undefined' : _typeof(inputData)).toLowerCase()) {

					case 'string':
						if (pattern.toLowerCase() === 'json') {
							result = JSON.parse(inputData);
						}
						break;
					case 'object':
						if (Object.prototype.toString.call(pattern) === '[object Array]') {
							for (i = 0, len = pattern.length; i < len; i++) {
								if (!pattern[i][2]) {
									if (Object.prototype.toString.call(pattern[i][0]) === '[object Array]') {
										throw new Error('输入的数据不能是数组,除非有处理函数');
									} else {
										outputData[pattern[i][1]] = inputData[pattern[i][0]];
									}
								} else {
									if (Object.prototype.toString.call(pattern[i][0]) === '[object Array]') {
										outputData[pattern[i][1]] = pattern[i][2](inputData[pattern[i][0]]);
									}
									outputData[pattern[i][1]] = pattern[i][2](inputData[pattern[i][0]]);
								}
							}
							result = outputData;
						} else if (typeof pattern == 'function') {
							result = pattern(inputData);
						}
						break;
					default:
						result = inputData;
						break;
				}
				return result;
			}
		};
	}();

	if (( false ? 'undefined' : _typeof(module)) == 'object') module.exports = ajaxExpanding;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(166)(module)))

/***/ },

/***/ 166:
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }

});