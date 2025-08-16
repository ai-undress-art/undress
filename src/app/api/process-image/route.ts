import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rateLimit';
import { ComfyUIClient } from 'comfy-ui-client';
import type { Prompt } from 'comfy-ui-client';
const { Buffer } = require('buffer');
import { Blob } from 'buffer';

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

    const serverAddress = '103.85.179.194:58190';
    const clientId = 'baadbabe-b00b-4206-9420-deadd00d1337';
    const client = new ComfyUIClient(serverAddress, clientId);

    // Connect to server
    await client.connect();
    const prompt = {
  "6": {
    "inputs": {
      "text": "remove clothes",
      "speak_and_recognation": true,
      "clip": [
        "38",
        0
      ]
    },
    "class_type": "CLIPTextEncode",
    "_meta": {
      "title": "CLIP文本编码"
    }
  },
  "8": {
    "inputs": {
      "samples": [
        "31",
        0
      ],
      "vae": [
        "39",
        0
      ]
    },
    "class_type": "VAEDecode",
    "_meta": {
      "title": "VAE解码"
    }
  },
  "31": {
    "inputs": {
      "seed": 31743295861632,
      "steps": 20,
      "cfg": 1,
      "sampler_name": "euler",
      "scheduler": "simple",
      "denoise": 1,
      "model": [
        "197",
        0
      ],
      "positive": [
        "35",
        0
      ],
      "negative": [
        "135",
        0
      ],
      "latent_image": [
        "124",
        0
      ]
    },
    "class_type": "KSampler",
    "_meta": {
      "title": "K采样器"
    }
  },
  "35": {
    "inputs": {
      "guidance": 2.5,
      "conditioning": [
        "177",
        0
      ]
    },
    "class_type": "FluxGuidance",
    "_meta": {
      "title": "Flux引导"
    }
  },
  "37": {
    "inputs": {
      "unet_name": "flux1-kontext-dev.safetensors",
      "weight_dtype": "default"
    },
    "class_type": "UNETLoader",
    "_meta": {
      "title": "UNet加载器"
    }
  },
  "38": {
    "inputs": {
      "clip_name1": "clip_l.safetensors",
      "clip_name2": "t5xxl_fp8_e4m3fn.safetensors",
      "type": "flux",
      "device": "default"
    },
    "class_type": "DualCLIPLoader",
    "_meta": {
      "title": "双CLIP加载器"
    }
  },
  "39": {
    "inputs": {
      "vae_name": "ae.sft"
    },
    "class_type": "VAELoader",
    "_meta": {
      "title": "加载VAE"
    }
  },
  "42": {
    "inputs": {
      "image": [
        "216",
        0
      ]
    },
    "class_type": "FluxKontextImageScale",
    "_meta": {
      "title": "FluxKontextImageScale"
    }
  },
  "124": {
    "inputs": {
      "pixels": [
        "42",
        0
      ],
      "vae": [
        "39",
        0
      ]
    },
    "class_type": "VAEEncode"
  },
  "135": {
    "inputs": {
      "conditioning": [
        "6",
        0
      ]
    },
    "class_type": "ConditioningZeroOut"
  },
  "177": {
    "inputs": {
      "conditioning": [
        "6",
        0
      ],
      "latent": [
        "124",
        0
      ]
    },
    "class_type": "ReferenceLatent"
  },
  "197": {
    "inputs": {
      "lora_name": "clothes_remover_v0.safetensors",
      "strength_model": 1,
      "model": [
        "37",
        0
      ]
    },
    "class_type": "LoraLoaderModelOnly"
  },
  "216": {
    "inputs": {
      "image": "微信截图_20250425002002.png"
    },
    "class_type": "LoadImage"
  },
  "259": {
    "inputs": {
      "filename_prefix": "ComfyUI",
      "images": [
        "8",
        0
      ]
    },
    "class_type": "SaveImage"
  }
}

  let blobImgUpload = await base64ToBlob(image);

  let uploadRes = await client.uploadImage(blobImgUpload, "demo.png", true);
  console.log('uploadRes', uploadRes)

  prompt['216'].inputs.image = uploadRes.name;

    const images = await client.getImages(prompt);

    // Save images to file
    // const outputDir = './tmp/output';
    // await client.saveImages(images, outputDir);
    const blobImg = images['259'][0].blob
    console.log('images', blobImg);


    const arrayBuffer = await blobImg.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const res = buffer.toString('base64')
    console.log('res', res)

    // TODO: 在这里集成实际的AI图片处理逻辑
    // 例如：调用外部AI服务API或本地模型
    // const processedImageBase64 = await callAIProcessingService(image);
        // Disconnect
    await client.disconnect();
    // 目前返回原图作为示例（实际应用中会返回处理后的图片）
    const processedImageBase64 = 'data:image/png;base64,' + res;

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


async function base64ToBlob(base64String: string): Promise<Buffer> {
  const parts = base64String.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = Buffer.from(parts[1], 'base64');
  
  return raw;
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