import { NextResponse } from 'next/server';
import { Config } from '../../../../../browser-extention/src/types';

export async function GET() {
  const config: Config = {
    workDomains: [
      'company.com',
      'internal-tools.com',
      'workspace.company.com'
    ],
    quizInterval: 30 * 60 * 1000 // 30 minučių
  };

  return NextResponse.json(config);
} 