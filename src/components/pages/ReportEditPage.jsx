import { Button, Container, Input, InputGroup, InputGroupText } from "reactstrap"

export const ReportEditPage = () => {
    return (
        <Container>
            <Button style={{ margin : '10px 0'}} color="primary">前回の内容をコピー</Button>
            <br />
            <InputGroup>
            <InputGroupText>
                平均残業時間
            </InputGroupText>
            <Input placeholder="" />
            <InputGroupText>
                体調
            </InputGroupText>
            <Input placeholder="" />
            <InputGroupText>
                進捗状況
            </InputGroupText>
            <Input placeholder="" />
            </InputGroup>
            <br />
            <h4>作業内容</h4>
            <InputGroup>
                <Input placeholder=""/>
            </InputGroup>
            <br />
            <h4>所感</h4>
            <InputGroup>
                <Input placeholder="" style={{ height : "100px" }}/>
            </InputGroup>
            <br />
            <h4>メンバー状況</h4>
            <InputGroup>
                <Input placeholder="" style={{ height : "100px", marginBottom: "50px"}}/>
            </InputGroup>
        </Container>
    )
}