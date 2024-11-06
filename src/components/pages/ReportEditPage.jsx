import { Box } from '@chakra-ui/react';
import {
  Button,
  Container,
  Input,
  InputGroup,
  InputGroupText,
} from 'reactstrap';

export const ReportEditPage = () => {
  return (
    <Container style={{ marginBottom: '10px' }}>
      <Box display="flex" alignItems="center" gap="10px" marginBottom={'10px'}>
        <Box display="flex" gap="10px" marginLeft="auto">
          <Button style={{ margin: '10px 0' }} color="primary">
            前回の内容をコピー
          </Button>
          <Button style={{ margin: '10px 0' }} color="primary">
            クリア
          </Button>
        </Box>
      </Box>
      <h1
        style={{ fontSize: '1.5em', fontWeight: 'bold', marginBottom: '10px' }}
      >
        現場基本情報
      </h1>
      <InputGroup>
        <InputGroupText>氏名</InputGroupText>
        <Input placeholder="" />
        <InputGroupText>所属チームLD名</InputGroupText>
        <Input placeholder="" />
        <InputGroupText>自社担当営業</InputGroupText>
        <Input placeholder="" />
      </InputGroup>
      <br />
      <h1
        style={{ fontSize: '1.5em', fontWeight: 'bold', marginBottom: '2px' }}
      >
        営業に関する情報
      </h1>
      <Box style={{ marginLeft: '8px' }}>
        ・PJやチームの今後の展開（増員や減員など）
        <br />
        ・自分自身の延長や途中切り上げなどの情報
        <br />
        ・他のACT社員の評判
        <br />
        ・誰からの情報かできるだけ記入してください
        <br />
      </Box>
      <h4
        style={{ fontWeight: 'bold', marginBottom: '2px', marginTop: '10px' }}
      >
        情報源（上位会社 ・ 協力会社 ・ ACT社員 ・ その他）
      </h4>
      <InputGroup>
        <Input placeholder="" />
      </InputGroup>
      <h4
        style={{ fontWeight: 'bold', marginBottom: '2px', marginTop: '10px' }}
      >
        情報収集手段（直接問合せ ・ 先輩社員から ・ 全体周知 ・ 小耳に挟んだ ・
        その他）
      </h4>
      <InputGroup>
        <Input placeholder="" />
      </InputGroup>
      <h4
        style={{ fontWeight: 'bold', marginBottom: '2px', marginTop: '10px' }}
      >
        営業に関する情報
      </h4>
      <InputGroup>
        <Input
          type="textarea"
          placeholder=""
          maxLength={500}
          style={{ height: '100px' }}
        />
      </InputGroup>

      <h1
        style={{ fontSize: '1.5em', fontWeight: 'bold', marginBottom: '10px' }}
      >
        業務内容
      </h1>
      <InputGroup>
        <InputGroupText>平均残業時間</InputGroupText>
        <Input placeholder="" />
        <InputGroupText>体調</InputGroupText>
        <Input placeholder="" />
        <InputGroupText>進捗状況</InputGroupText>
        <Input placeholder="" />
      </InputGroup>
      <br />
      <h4 style={{ fontWeight: 'bold', marginBottom: '2px' }}>作業内容</h4>
      <InputGroup>
        <Input placeholder="" />
      </InputGroup>
      <br />
      <h4 style={{ fontWeight: 'bold', marginBottom: '2px' }}>所感</h4>
      <InputGroup>
        <Input
          type="textarea"
          placeholder=""
          maxLength={1000}
          style={{ height: '100px' }}
        />
      </InputGroup>
      <br />
      <h4 style={{ fontWeight: 'bold', marginBottom: '2px' }}>メンバー状況</h4>
      <InputGroup>
        <Input
          type="textarea"
          placeholder=""
          maxLength={1000}
          style={{ height: '100px' }}
        />
      </InputGroup>
    </Container>
  );
};
