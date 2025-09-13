import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// 评论数据类型
interface Comment {
  id: string;
  gameId: string;
  userName: string;
  userEmail: string;
  content: string;
  rating: number;
  date: string;
  helpful: number;
  replies?: Comment[];
}

// 评论存储文件路径
const COMMENTS_FILE = path.join(process.cwd(), 'data', 'comments.json');

// 确保数据目录存在
const ensureDataDir = () => {
  const dataDir = path.dirname(COMMENTS_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// 读取评论数据
const readComments = (): Comment[] => {
  try {
    ensureDataDir();
    if (!fs.existsSync(COMMENTS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(COMMENTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading comments:', error);
    return [];
  }
};

// 保存评论数据
const saveComments = (comments: Comment[]) => {
  try {
    ensureDataDir();
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2));
  } catch (error) {
    console.error('Error saving comments:', error);
    throw error;
  }
};

// 生成唯一ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// 验证评论数据
const validateComment = (comment: Partial<Comment>) => {
  if (!comment.gameId || !comment.userName || !comment.userEmail || !comment.content) {
    return { valid: false, error: 'Missing required fields' };
  }
  
  if (comment.userName.length < 2 || comment.userName.length > 50) {
    return { valid: false, error: 'Name must be between 2-50 characters' };
  }
  
  if (comment.content.length < 10 || comment.content.length > 1000) {
    return { valid: false, error: 'Content must be between 10-1000 characters' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(comment.userEmail)) {
    return { valid: false, error: 'Invalid email format' };
  }
  
  if (comment.rating && (comment.rating < 1 || comment.rating > 5)) {
    return { valid: false, error: 'Rating must be between 1-5' };
  }
  
  return { valid: true };
};

// 获取评论
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get('gameId');
    
    const comments = readComments();
    
    if (gameId) {
      const gameComments = comments.filter(comment => comment.gameId === gameId);
      return NextResponse.json({ comments: gameComments });
    }
    
    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// 提交评论
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { gameId, userName, userEmail, content, rating = 5 } = body;
    
    // 验证数据
    const validation = validateComment({ gameId, userName, userEmail, content, rating });
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }
    
    // 创建新评论
    const newComment: Comment = {
      id: generateId(),
      gameId,
      userName: userName.trim(),
      userEmail: userEmail.trim().toLowerCase(),
      content: content.trim(),
      rating: Number(rating),
      date: new Date().toISOString(),
      helpful: 0,
      replies: []
    };
    
    // 保存评论
    const comments = readComments();
    comments.push(newComment);
    saveComments(comments);
    
    return NextResponse.json({ 
      success: true, 
      comment: newComment,
      message: 'Comment submitted successfully!' 
    });
  } catch (error) {
    console.error('Error submitting comment:', error);
    return NextResponse.json(
      { error: 'Failed to submit comment' },
      { status: 500 }
    );
  }
}

// 更新评论（点赞）
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { commentId, action } = body;
    
    if (!commentId || !action) {
      return NextResponse.json(
        { error: 'Missing commentId or action' },
        { status: 400 }
      );
    }
    
    const comments = readComments();
    const commentIndex = comments.findIndex(c => c.id === commentId);
    
    if (commentIndex === -1) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }
    
    if (action === 'helpful') {
      comments[commentIndex].helpful += 1;
    }
    
    saveComments(comments);
    
    return NextResponse.json({ 
      success: true, 
      helpful: comments[commentIndex].helpful 
    });
  } catch (error) {
    console.error('Error updating comment:', error);
    return NextResponse.json(
      { error: 'Failed to update comment' },
      { status: 500 }
    );
  }
}

// 删除评论
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get('commentId');
    
    if (!commentId) {
      return NextResponse.json(
        { error: 'Missing commentId' },
        { status: 400 }
      );
    }
    
    const comments = readComments();
    const filteredComments = comments.filter(c => c.id !== commentId);
    
    if (filteredComments.length === comments.length) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }
    
    saveComments(filteredComments);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Comment deleted successfully!' 
    });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    );
  }
}
