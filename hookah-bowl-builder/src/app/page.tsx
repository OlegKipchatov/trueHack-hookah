'use client'

import { useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Card,
  CardBody,
  Input,
} from '@heroui/react'

const HomePage = () => {
  const [mixName, setMixName] = useState('')

  const handleSave = () => {
    alert(mixName)
  }

  return (
    <div>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold">Hookah Bowl Builder</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button color="primary">Sign in</Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <main className="flex justify-center mt-10">
        <Card className="w-full max-w-md">
          <CardBody className="gap-4">
            <Input
              label="Mix name"
              value={mixName}
              onChange={(e) => setMixName(e.target.value)}
            />
            <Button color="primary" onPress={handleSave}>
              Save
            </Button>
          </CardBody>
        </Card>
      </main>
    </div>
  )
}

export default HomePage
