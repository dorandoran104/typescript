import mybatisMapper from 'mybatis-mapper';
import path from 'path';

mybatisMapper.createMapper([
  path.join(__dirname,'../../mapper/EmployeeMapper.xml')
  ,path.join(__dirname,'../../mapper/MemberMapper.xml')
  ,path.join(__dirname,'../../mapper/CategoryMapper.xml')
  ,path.join(__dirname,'../../mapper/FileMapper.xml')
  ,path.join(__dirname,'../../mapper/GoodsMapper.xml')
])

export const format = { language: 'sql', indent: '  ' };

export default mybatisMapper;