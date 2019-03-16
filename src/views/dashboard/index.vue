<template>
  <div class="postInfo-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <el-row>
        <el-col :span="8">
          <el-form-item prop="find_id" label-width="85px" label="学号 :" class="postInfo-container-item">
            <el-input v-model="postForm.find_id" filterable remote placeholder="搜索用户" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label-width="85px" label="发布时间 :" class="postInfo-container-item">
            <el-date-picker v-model="postForm.start_time" type="datetime" format="yyyy-MM-dd" placeholder="选择日期时间"/>至
            <el-date-picker v-model="postForm.end_time" type="datetime" format="yyyy-MM-dd" placeholder="选择日期时间"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-button v-loading="loading" style="margin-left: 110px; font-size:1em;" type="success" @click="resetForm" >重   置
          </el-button>
          <el-button v-loading="loading" style="margin-left: 70px; font-size:1em;" type="success" @click="submitForm" >查   找
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>


<script>
import { validateNumber } from '@/utils/validate'

const defaultForm = {
  find_id: '', // 寻找的学生ID
  start_time: undefined, // 开始时间
  end_time: undefined, // 结束时间
  importance: 0
}

export default {
  name: 'Home',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        this.$message({
          message: rule.field + '为必填项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必填项'))
      } else {
        callback()
      }
    }
    const isValidateNumber = (rule, value, callback) => {
      if (value) {
        if (validateNumber(value)) {
          callback()
        } else {
          this.$message({
            message: '学号填写不正确',
            type: 'error'
          })
          callback(new Error('学号填写不正确'))
        }
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      // userListOptions: [],
      rules: {
        find_id: [
           { validator: validateRequire, trigger: 'blur' },
           { validator: isValidateNumber, trigger: 'blur' }
        ]
      },
      tempRoute: {}
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    },
    lang() {
      return this.$store.getters.language
    }
  },
  created() {
     if (this.isEdit) {
      // const id = this.$route.params && this.$route.params.id
      // this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }

    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {  
    submitForm() {
       this.postForm.start_time = parseInt(this.start_time / 1000)
       this.postForm.end_time = parseInt(this.end_time / 1000)

       this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '成功',
            message: '搜索成功',
            type: 'success',
            duration: 2000
          })
          this.postForm.status = 'published'
          this.loading = false
        } else {
          //console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.postForm = Object.assign({}, defaultForm)
    }
  }
}
</script>
