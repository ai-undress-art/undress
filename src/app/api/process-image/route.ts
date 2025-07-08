import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rateLimit';

// 定义请求体类型
interface ProcessImageRequest {
  image: string; // base64编码的图片
  fileName?: string;
  fileSize?: number;
}

// 定义响应类型
interface ProcessImageResponse {
  success: boolean;
  processedImage?: string; // base64编码的处理后图片
  message?: string;
  error?: string;
}

// 获取客户端IP地址
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return request.ip || 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    // 应用速率限制
    const clientIP = getClientIP(request);
    const isAllowed = rateLimit(clientIP, 10, 60000); // 每分钟最多10次请求
    
    if (!isAllowed) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many requests. Please try again later.' 
        },
        { status: 429 }
      );
    }

    // 解析请求体
    const body: ProcessImageRequest = await request.json();
    const { image, fileName, fileSize } = body;

    // 验证请求数据
    if (!image) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'No image data provided' 
        },
        { status: 400 }
      );
    }

    // 验证base64格式
    if (!image.startsWith('data:image/')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid image format. Please provide a base64 encoded image.' 
        },
        { status: 400 }
      );
    }

    // 验证文件大小（限制为10MB）
    const maxSizeBytes = 10 * 1024 * 1024; // 10MB
    if (fileSize && fileSize > maxSizeBytes) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'File size too large. Maximum size is 10MB.' 
        },
        { status: 400 }
      );
    }

    // 模拟处理延迟（实际项目中这里会调用AI处理服务）
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));

    // TODO: 在这里集成实际的AI图片处理逻辑
    // 例如：调用外部AI服务API或本地模型
    // const processedImageBase64 = await callAIProcessingService(image);
    
    // 目前返回原图作为示例（实际应用中会返回处理后的图片）
    const processedImageBase64 = image;

    // 记录处理日志（可选）
    console.log(`Image processed: ${fileName || 'unknown'}, Size: ${fileSize || 'unknown'} bytes`);

    const response: ProcessImageResponse = {
      success: true,
      processedImage: processedImageBase64,
      message: 'Image processed successfully'
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('Error processing image:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

// 处理OPTIONS请求（CORS预检）
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 