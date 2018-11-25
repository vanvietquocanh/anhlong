module.exports = `<div class="container mt-2">
					<form action="/share" class="form-group row" method="post" accept-charset="utf-8">
						<div class="col-sm-4">
							<label for="exampleInputEmail1">Tên Package</label>
							<input type="text" name="package" placeholder="Tên package..." class="form-control">
						</div>
						<div class="col-sm-4">
							<label for="exampleInputEmail1">Tên Model</label>
							<select class="custom-select" name="model">
							  <option selected value="MIA1">MIA1</option>
							</select>
						</div>
						<div class="col-sm-4">
							<label for="exampleInputEmail1">CPU</label>
							<select class="custom-select" name="cpu">
							  <option selected value="Unknown">Không xác định</option>
							  <option value="1">1</option>
							  <option value="2">2</option>
							</select>
						</div>
						<div class="col-sm-12">
							<label for="exampleInputEmail1">Nội dung file Script:</label>
							<textarea name="content-script" id="" class="form-control" placeholder="Nội dung script..." cols="30" rows="10"></textarea>
						</div>
						<div class="col-sm-12">
							<label for=""></label>
							<button type="submit" class="pull-right btn btn-primary mt-2">Chia sẽ</button>
							<button type="submit" class="pull-right btn btn-primary mt-2 d-none">Cập nhật</button>
						</div>
					</form>
				</div>`;