'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button, Card, CardBody, Progress } from '@heroui/react'
import { useTranslations } from 'next-intl'
import OptimizedImage from './ui/OptimizedImage'
import { analytics } from '@/lib/analytics'

export default function UploadSection() {
  const t = useTranslations('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedResult, setProcessedResult] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('image/')) {
      setSelectedFile(file)
      setProcessedResult(null) // 重置处理结果

      // 跟踪图片上传事件
      analytics.imageUpload(file.size, file.type)
    } else {
      alert(t('pleaseSelectImage'))
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0])
    }
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  // 将文件转换为base64格式
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleProcess = async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    setProgress(0)

    const startTime = Date.now()

    try {
      // 模拟处理进度
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + Math.random() * 15
        })
      }, 1000)

      // 将文件转换为base64
      const base64Image = await fileToBase64(selectedFile);

      // 发送API请求
      const response = await fetch('/api/process-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Image,
          fileName: selectedFile.name,
          fileSize: selectedFile.size,
        }),
      });

      const result = await response.json();

      // 清除进度条定时器
      clearInterval(progressInterval);
      setProgress(100);

      if (result.success && result.processedImage) {
        // 设置处理结果
        setProcessedResult(result.processedImage);

        // 跟踪处理成功事件
        const processingTime = Date.now() - startTime
        analytics.imageProcess(processingTime, true)

        // 处理完成后滚动到结果区域（仅在移动端）
        setTimeout(() => {
          if (window.innerWidth < 1024) {
            const resultSection = document.getElementById('result-section')
            if (resultSection) {
              resultSection.scrollIntoView({ behavior: 'smooth' })
            }
          }
        }, 100);
      } else {
        // 处理失败
        console.error('处理失败:', result.error || result.message);
        alert(`${t('processingFailed')}: ${result.error || t('unknownError')}`);

        // 跟踪处理失败事件
        const processingTime = Date.now() - startTime
        analytics.imageProcess(processingTime, false)
        analytics.error('image_processing_failed', result.error || 'Unknown error')
      }
    } catch (error) {
      console.error('API调用失败:', error);
      alert(t('networkError'));

      // 跟踪网络错误
      const processingTime = Date.now() - startTime
      analytics.imageProcess(processingTime, false)
      analytics.error('api_call_failed', error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsProcessing(false);
    }
  }

  const handleReset = () => {
    // 现在processedResult是base64字符串，不需要清理blob URLs
    setSelectedFile(null)
    setProcessedResult(null)
    setProgress(0)
  }

  // 组件卸载时清理（现在不需要清理blob URLs）
  useEffect(() => {
    return () => {
      // processedResult现在是base64字符串，不需要清理
    }
  }, [processedResult])

  return (
    <section id="upload-section" className="px-4  relative overflow-hidden">


      <div className="relative max-w-7xl mx-auto">


        {/* 单行布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:items-stretch items-start mt-5">

          {/* 上传区域 */}
          <div className="space-y-6 flex flex-col h-full">
            <h2 className="text-xl font-bold text-white neon-text mb-4">
              📤 {t('title')}
            </h2>

            {/* 拖拽上传区域 */}
            <Card
              className={`border-2 border-dashed transition-all duration-300 lg:glass-effect-dark ${dragActive
                ? 'border-seductive-pink/60 lg:neon-border-pink bg-seductive-purple/15'
                : 'border-seductive-purple/30 hover:border-seductive-pink/50'
                }`}
            >
              <CardBody
                className="p-8 text-center cursor-pointer"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={handleBrowseClick}
              >
                <div className="space-y-4">
                  <div className="text-4xl opacity-80">📁</div>
                  <div>
                    <p className="text-white/90">
                      {t('dragText')}{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-passion font-semibold cursor-pointer hover:bg-gradient-primary transition-all duration-300 neon-text-pink">
                        {t('selectFile')}
                      </span>
                    </p>
                    <p className="text-white/60 mt-2 text-sm">
                      {t('supportedFormats')}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* 隐藏的文件输入 */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInput}
            />

            {/* 选中的文件信息 */}
            {selectedFile && (
              <Card className="border border-seductive-purple/30 lg:glass-effect-dark lg:shadow-neon">
                <CardBody className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">{selectedFile.name}</p>
                      <p className="text-white/60 text-sm">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} {t('fileSize')}
                      </p>
                    </div>
                    <Button
                      variant="light"
                      size="sm"
                      className="text-seductive-red hover:text-seductive-dark-red hover:bg-seductive-red/10 transition-all duration-300"
                      onClick={handleReset}
                    >
                      {t('reset')}
                    </Button>
                  </div>
                </CardBody>
              </Card>
            )}

            {/* 处理按钮 */}
            <Button
              size="lg"
              className={`btn-gradient-primary px-16 py-4 text-xl font-bold rounded-full mx-auto shadow-neon-pink hover:shadow-neon w-full py-4 text-lg font-bold rounded-xl transition-all duration-300`}
              isDisabled={!selectedFile || isProcessing}
              isLoading={isProcessing}
              onClick={handleProcess}
            >
              {isProcessing ? `🔄 ${t('aiProcessing')}` : `🚀 ${t('startProcessing')}`}
            </Button>

            {/* 广告位 - 紧凑版 */}
            <Card id="result-section" className="border border-seductive-purple/20  transition-all duration-300">
              <CardBody>
                <div id="container-0f7dde16e901c333cf6f249cdd8e53c6" className="text-center w-full flex justify-center items-center">
                {/* <iframe src="https://sefsdvc.com/en/us/media/dynamic/id?zid=11923&pid=0&custom1=&custom2=60671&custom3=%7Btransaction_id%7D&custom6=&custom7=PUB_380687&cturl=https://t.irtyf.com/ihxg01j1ds?file_id=252622&aff_id=380687&offer_id=3664&aff_sub=&url=" width="300" height="250"  scrolling="no" frameBorder="0"></iframe> */}
                  {/* <a href="https://t.ancdu.link/380687/6744?bo=2753,2754,2755,2756&popUnder=true&aff_sub5=SF_006OG000004lmDN&aff_sub4=AT_0002"><img src="https://www.imglnkx.com/9456/DAT-480_DESIGN-23859_1_300250.gif" width="300" height="250" /></a> */}
                </div>
              </CardBody>
            </Card>

            {/* 处理进度 */}
            {isProcessing && (
              <div className="space-y-3">
                <Progress
                  size="md"
                  value={progress}
                  color="secondary"
                  className="w-full"
                  classNames={{
                    base: "max-w-md",
                    track: "drop-shadow-md border border-seductive-purple/30",
                    indicator: "bg-gradient-passion shadow-neon-pink",
                    label: "tracking-wider font-medium text-white",
                    value: "text-white/80"
                  }}
                  showValueLabel={true}
                />
                <p className="text-white/70 text-sm text-center">
                  {t('processingNote')}
                </p>
              </div>
            )}
          </div>

          {/* 处理中状态或预览对比 */}
          <div className="lg:col-span-2 flex flex-col h-full">
            <h3 className="text-xl font-bold text-white neon-text-red mb-4">
              ✨ {t('processedImage')}
            </h3>

            {!selectedFile && !processedResult && (
              <Card className="border border-seductive-purple/30 flex-1 flex">
                <CardBody className="p-12 text-center flex items-center justify-center">
                  <div>
                    <div className="text-6xl opacity-60 mb-6">🖼️</div>
                    <p className="text-white/70 text-lg">
                      {t('uploadImageFirst')}
                    </p>
                  </div>
                </CardBody>
              </Card>
            )}

            {selectedFile && !processedResult && !isProcessing && (
              <Card className="border border-seductive-purple/30 flex-1 flex">
                <CardBody className="p-8 text-center flex items-center justify-center">
                  <div className="w-full max-w-md">
                    <div className="aspect-square  from-seductive-purple/20 via-seductive-pink/15 to-seductive-dark-red/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                      <OptimizedImage
                        src={URL.createObjectURL(selectedFile)}
                        alt={t('originalImage')}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover rounded-2xl"
                        priority={true}
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="text-center text-white/90">
                          <div className="text-3xl mb-2">⚡</div>
                          <p className="font-medium">{t('startProcessing')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}

            {isProcessing && (
              <Card className="border border-seductive-purple/30 flex-1 flex">
                <CardBody className="p-8 text-center flex items-center justify-center">
                  <div className="w-full max-w-md">
                    <div className="aspect-square  from-seductive-purple/20 via-seductive-pink/15 to-seductive-dark-red/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                      {selectedFile && (
                        <OptimizedImage
                          src={URL.createObjectURL(selectedFile)}
                          alt={t('processing')}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover rounded-2xl opacity-50"
                          priority={true}
                        />
                      )}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="text-center text-white/90">
                          <div className="text-4xl mb-4 pulse-seductive">🤖</div>
                          <p className="font-medium text-lg">{t('aiProcessing')}</p>
                          <p className="text-white/70 mt-2">{t('processingNote')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}

            {processedResult && (
              <div className="flex-1 flex flex-col">
                <Card className="border border-seductive-pink/40 neon-border-pink flex-1 flex">
                  <CardBody className="flex flex-col">
                    <div className="flex-1 flex items-center justify-center">
                      <div className="max-w-lg w-full max-h-96 rounded-xl overflow-hidden via-seductive-pink/5 flex items-center justify-center">
                        <OptimizedImage
                          src={processedResult}
                          alt={t('processedImage')}
                          width={600}
                          height={400}
                          className="max-w-full max-h-full object-contain"
                          priority={true}
                        />
                      </div>
                    </div>
                  </CardBody>
                </Card>

                <div className="flex justify-center gap-4 mt-6">
                  <Button
                    size="lg"
                    className="btn-gradient-primary px-8 py-3 font-bold"
                    onClick={() => {
                      const link = document.createElement('a')
                      link.href = processedResult
                      link.download = `ai-processed-${Date.now()}.jpg`
                      link.click()

                      // 跟踪下载事件
                      analytics.imageDownload()
                    }}
                  >
                    💾 {t('downloadResult')}
                  </Button>
                  <Button
                    size="lg"
                    variant="bordered"
                    className="border-seductive-purple/40 text-white hover:bg-seductive-purple/10 px-8 py-3 font-bold"
                    onClick={handleReset}
                  >
                    🔄 {t('reset')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
} 