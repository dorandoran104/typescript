import mybatisMapper from 'mybatis-mapper';
import path from 'path';

mybatisMapper.createMapper([
  path.join(__dirname,'../../mapper/EmployeeMapper.xml')
  ,path.join(__dirname,'../../mapper/MemberMapper.xml')
])

export const format = { language: 'sql', indent: '  ' };

export default mybatisMapper;